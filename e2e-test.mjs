// End-to-end regression test for the MongoDB migration.
// Run: node e2e-test.mjs   (site must be running on localhost:3000)
import { chromium } from "playwright";
import { MongoClient } from "mongodb";
import { execSync } from "child_process";
import fs from "fs";

const BASE = "http://localhost:3000";
const SHOTS = "/tmp/e2e-shots";
fs.mkdirSync(SHOTS, { recursive: true });
const EMAIL = `tester${Date.now()}@test.com`;

// Direct read-only connection to the embedded MongoDB (to grade the exam honestly).
const findMongoPort = () => {
  if (process.platform === "win32") {
    const out = execSync(
      'powershell -NoProfile -Command "(Get-CimInstance Win32_Process | Where-Object { $_.Name -match \'mongod\' } | Select-Object -ExpandProperty CommandLine)"'
    ).toString();
    const match = out.match(/--port\s+(\d+)/);
    if (!match) throw new Error("Could not find embedded mongod.exe port (is `next dev` running?)");
    return match[1];
  }
  return execSync("ps -eo args | grep -o 'mongod-x64[^ ]* --port [0-9]*' | grep -o '[0-9]*$' | head -1")
    .toString()
    .trim();
};
const mongoPort = findMongoPort();
const mongo = new MongoClient(`mongodb://127.0.0.1:${mongoPort}`);
await mongo.connect();
const mdb = mongo.db("bodhi");

const results = [];
const ok = (s, d = "") => {
  results.push(`PASS ${s}${d ? ` — ${d}` : ""}`);
  console.log(results.at(-1));
};
const fail = (s, d) => {
  results.push(`FAIL ${s} — ${d}`);
  console.log(results.at(-1));
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
page.setDefaultTimeout(25000);

async function logout() {
  const btn = page.getByRole("button", { name: "Log out" });
  if (await btn.count()) await btn.first().click();
  await page.waitForURL(`${BASE}/`);
}
async function login(email, password) {
  await page.goto(`${BASE}/login`);
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.getByRole("button", { name: "Log in" }).click();
  await page.waitForURL("**/courses");
}

try {
  // 1. Register
  await page.goto(`${BASE}/register`);
  await page.fill('input[name="name"]', "Mongo Tester");
  await page.fill('input[name="email"]', EMAIL);
  await page.fill('input[name="phone"]', "9876500003");
  await page.fill('input[name="password"]', "testpass123");
  await page.getByRole("button", { name: "Sign up" }).click();
  await page.waitForURL("**/onboarding");
  ok("1 register", EMAIL);

  // 2. OTP + ID upload
  await page.getByRole("button", { name: "Send verification code" }).click();
  await page.waitForSelector("text=/your code is/i");
  const otp = (await page.textContent("body")).match(/your code is\s*(\d{6})/i)[1];
  await page.fill('input[name="code"]', otp);
  await page.getByRole("button", { name: "Verify", exact: true }).click();
  await page.waitForSelector("text=Phone verified.");
  ok("2a phone verified", `OTP ${otp}`);

  fs.writeFileSync(
    "/tmp/test-id.png",
    Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
      "base64"
    )
  );
  await page.setInputFiles('input[type="file"]', "/tmp/test-id.png");
  await page.getByRole("button", { name: "Upload document" }).click();
  await page.waitForSelector("text=/waiting for admin review/i");
  ok("2b id uploaded");

  // 3. Admin approves + admin page renders
  await logout();
  await login("admin@bodhi.test", "admin123");
  await page.goto(`${BASE}/admin`);
  await page.waitForSelector(`text=${EMAIL}`);
  // Approve the row for OUR tester (the pending-queue li containing our email).
  const pendingRow = page
    .locator("li", { hasText: EMAIL })
    .filter({ has: page.getByRole("button", { name: "Approve" }) });
  await pendingRow.getByRole("button", { name: "Approve" }).click();
  await pendingRow.waitFor({ state: "detached" });
  const adminBody = await page.textContent("body");
  const bankCounts = [...adminBody.matchAll(/Bank: (\d+) questions/g)].map((m) => Number(m[1]));
  const adminChecks =
    adminBody.includes("Mock series question banks") &&
    bankCounts.length === 2 &&
    bankCounts.every((n) => n === 100) &&
    adminBody.includes("id_approved");
  adminChecks ? ok("3 admin page + approval") : fail("3 admin page", "missing sections");
  await page.screenshot({ path: `${SHOTS}/admin.png`, fullPage: true });

  // 4. Log in as tester
  await logout();
  await login(EMAIL, "testpass123");
  ok("4 tester login");

  // 5. Buy GS series
  await page.goto(`${BASE}/courses`);
  await page.getByRole("link", { name: /GS Paper I — Mock Series/ }).click();
  await page.waitForSelector("text=/Unlock the full series/");
  await page.getByRole("button", { name: /Buy the series/ }).click();
  await page.waitForSelector("text=/series unlocked/");
  const gridCount = await page.locator('a[href*="quiz?paper="]').count();
  gridCount === 1 ? ok("5 series bought, grid shows 1 paper (honest labelling)") : fail("5 grid", `expected 1 link, got ${gridCount}`);
  const seriesUrl = page.url();

  // 6. Sit paper 1, answer first two questions with option A
  await page.click('a[href$="quiz?paper=1"]');
  await page.waitForSelector("text=/Paper 1/");
  const bodyText = await page.textContent("body");
  /1:5\d:\d\d|2:00:00/.test(bodyText) ? ok("6a paper 1 opened with ~2h timer") : fail("6a timer", bodyText.slice(0, 120));
  const radios = page.locator('input[type="radio"]');
  await radios.nth(0).check();
  await radios.nth(4).check();
  await page.getByRole("button", { name: /Submit paper \(2\/100/ }).click();
  await page.waitForSelector("text=/Your score/i");
  const scoreText = (await page.locator("text=/Your score/i").first().textContent()).trim();
  ok("6b submitted", `"${scoreText}"`);

  // 7. Answer paper
  await page.getByRole("link", { name: /answer paper/i }).first().click();
  await page.waitForSelector("text=/Subject-wise report/i");
  const apBody = await page.textContent("body");
  apBody.includes("Recommended books") && apBody.includes("Amazon") && apBody.includes("Flipkart")
    ? ok("7 answer paper + book recommendations")
    : fail("7 answer paper", apBody.slice(0, 300));
  await page.screenshot({ path: `${SHOTS}/answer-paper.png` });

  // 8. Grid shows attempt
  await page.goto(seriesUrl);
  const paper1 = page.locator('a[href$="quiz?paper=1"]');
  (await paper1.getAttribute("class")).includes("emerald")
    ? ok("8 paper 1 green in grid", `label "${(await paper1.textContent()).trim()}"`)
    : fail("8 grid state", await paper1.getAttribute("class"));

  // 9. Entrance exam (Class 10 Maths): answer honestly-correctly by reading
  // the answer key from the database, to exercise the PASS + certificate path.
  await page.goto(`${BASE}/courses`);
  await page.getByRole("link", { name: /Class 10 Mathematics/ }).click();
  await page.waitForURL(/\/courses\/\d+$/);
  const mathsCourseUrl = page.url();
  await page.getByRole("button", { name: /Pay & take the entrance exam/ }).click();
  await page.waitForSelector('input[type="radio"]');
  const qids = [
    ...new Set(
      (await page.locator('input[type="radio"]').evaluateAll((els) => els.map((e) => e.name))).map((n) =>
        Number(n.replace("q-", ""))
      )
    ),
  ];
  const key = new Map(
    (await mdb.collection("quiz_questions").find({ id: { $in: qids } }).toArray()).map((q) => [q.id, q.correct_index])
  );
  for (const qid of qids) {
    await page.locator(`input[name="q-${qid}"]`).nth(key.get(qid)).check();
  }
  await page.getByRole("button", { name: /submit/i }).click();
  await page.waitForSelector("text=/passed|congratulations|unlocked/i");
  const examBody = await page.textContent("body");
  const examScore = examBody.match(/(\d+)\s*\/\s*(\d+)/)?.[0] ?? "?";
  ok("9 entrance exam PASSED", `${qids.length} questions, score ${examScore}`);

  // 10. Course unlocked: open lesson 1, mark complete
  await page.goto(mathsCourseUrl);
  await page.waitForSelector('a[href*="/lessons/1"]');
  await page.click('a[href*="/lessons/1"]');
  await page.getByRole("button", { name: /mark.*complete/i }).click();
  await page.waitForSelector("text=/✓|Completed/i");
  ok("10a lesson 1 completed");

  // 10b. Entrance-exam certificate
  await page.goto(`${BASE}/my/certificates`);
  await page.locator('a[href^="/certificate/"]').first().click();
  await page.waitForSelector("text=/Verification ID/i");
  const vid = (await page.textContent("body")).match(/Verification ID:\s*([2346789ACDEFGHJKMNPQRTUVWXYZ]{10})/)?.[1];
  await page.screenshot({ path: `${SHOTS}/certificate.png` });
  vid ? ok("10b certificate rendered", `VID ${vid}`) : fail("10b certificate", "no verification id found");

  // 10c. PDF download endpoint
  const pdfResp = await page.request.get(`${BASE}/certificate/${vid}/pdf`);
  pdfResp.ok() && (await pdfResp.body()).subarray(0, 4).toString() === "%PDF"
    ? ok("10c certificate PDF downloads")
    : fail("10c PDF", `status ${pdfResp.status()}`);

  // 11. Public verification
  await page.goto(`${BASE}/verify?id=${vid}`);
  const verifyBody = await page.textContent("body");
  verifyBody.includes("Valid certificate") && verifyBody.includes("Mongo Tester")
    ? ok("11 verify page confirms certificate")
    : fail("11 verify", verifyBody.slice(0, 200));
} catch (e) {
  fail("EXCEPTION", e.message.split("\n")[0]);
  await page.screenshot({ path: `${SHOTS}/error.png` });
}

console.log("\n===== SUMMARY =====");
results.forEach((r) => console.log(r));
await mongo.close();
await browser.close();
process.exit(results.some((r) => r.startsWith("FAIL")) ? 1 : 0);
