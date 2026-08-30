"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { getDb, audit } from "@/lib/db";
import { createSession, destroySession, getSessionUser } from "@/lib/auth";
import { aiAvailable, generateCourse } from "@/lib/ai";

import { FREE_DAILY_GENERATIONS, EXAM_MINUTES, EXAM_QUESTIONS_PER_ATTEMPT, EXAM_PASS_PERCENT } from "@/lib/config";

// Certificate IDs use an alphabet without look-alike characters (no 0/O, 1/I/L, 5/S, 8/B)
// so people can read them off a printed certificate without mistakes.
const CERT_ALPHABET = "2346789ACDEFGHJKMNPQRTUVWXYZ";
function newVerificationId(): string {
  let id = "";
  for (let i = 0; i < 10; i++) id += CERT_ALPHABET[crypto.randomInt(CERT_ALPHABET.length)];
  return id;
}

// ---------- language ----------

export async function setLanguage(formData: FormData) {
  const lang = String(formData.get("lang"));
  if (["en", "hi", "bn"].includes(lang)) {
    const jar = await cookies();
    jar.set("learnzy_lang", lang, { path: "/", maxAge: 31536000 });
  }
  revalidatePath("/", "layout");
}

// ---------- auth ----------

export async function register(prev: unknown, formData: FormData): Promise<{ error?: string }> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const phone = String(formData.get("phone") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!name || name.length < 2) return { error: "Please enter your full name." };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { error: "Please enter a valid email address." };
  if (!/^\+?[0-9]{10,14}$/.test(phone.replace(/[\s-]/g, "")))
    return { error: "Please enter a valid phone number (10 digits, or with country code)." };
  if (password.length < 8) return { error: "Password must be at least 8 characters." };

  const db = getDb();
  const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
  if (existing) return { error: "An account with this email already exists. Try logging in." };

  const res = db
    .prepare("INSERT INTO users (email, password_hash, name, phone) VALUES (?, ?, ?, ?)")
    .run(email, bcrypt.hashSync(password, 10), name, phone.replace(/[\s-]/g, ""));
  await createSession(Number(res.lastInsertRowid));
  audit(email, "register", "New account created");
  redirect("/onboarding");
}

export async function login(prev: unknown, formData: FormData): Promise<{ error?: string }> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const db = getDb();
  const user = db.prepare("SELECT id, password_hash FROM users WHERE email = ?").get(email) as
    | { id: number; password_hash: string }
    | undefined;
  if (!user || !bcrypt.compareSync(password, user.password_hash))
    return { error: "Email or password is incorrect." };
  await createSession(user.id);
  redirect("/courses");
}

export async function logout() {
  await destroySession();
  redirect("/");
}

// ---------- onboarding: phone OTP (pilot mode) + ID upload ----------

export async function sendOtp(): Promise<{ code?: string; error?: string }> {
  const user = await getSessionUser();
  if (!user) return { error: "Please log in first." };
  const code = String(crypto.randomInt(100000, 999999));
  getDb()
    .prepare(
      "INSERT INTO otp_codes (user_id, code, expires_at) VALUES (?, ?, datetime('now', '+10 minutes')) ON CONFLICT(user_id) DO UPDATE SET code = excluded.code, expires_at = excluded.expires_at"
    )
    .run(user.id, code);
  // PILOT MODE: the code is returned to the screen instead of being sent by
  // SMS. In production this call goes to an SMS provider and the code is
  // never revealed in the response.
  return { code };
}

export async function verifyOtp(prev: unknown, formData: FormData): Promise<{ error?: string }> {
  const user = await getSessionUser();
  if (!user) return { error: "Please log in first." };
  const code = String(formData.get("code") ?? "").trim();
  const row = getDb()
    .prepare("SELECT code FROM otp_codes WHERE user_id = ? AND expires_at > datetime('now')")
    .get(user.id) as { code: string } | undefined;
  if (!row || row.code !== code) return { error: "That code is wrong or has expired. Send a new one." };
  const db = getDb();
  db.prepare("UPDATE users SET phone_verified = 1 WHERE id = ?").run(user.id);
  db.prepare("DELETE FROM otp_codes WHERE user_id = ?").run(user.id);
  audit(user.email, "phone_verified", "Phone verified (pilot mode OTP)");
  revalidatePath("/onboarding");
  return {};
}

const UPLOAD_DIR = path.join(process.cwd(), "data", "uploads");

export async function uploadId(prev: unknown, formData: FormData): Promise<{ error?: string }> {
  const user = await getSessionUser();
  if (!user) return { error: "Please log in first." };
  const file = formData.get("idfile") as File | null;
  if (!file || file.size === 0) return { error: "Please choose a file." };
  if (file.size > 5 * 1024 * 1024) return { error: "File is too large (max 5 MB)." };
  const okTypes = ["image/jpeg", "image/png", "application/pdf"];
  if (!okTypes.includes(file.type)) return { error: "Only JPG, PNG, or PDF files are accepted." };

  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  const ext = file.type === "application/pdf" ? "pdf" : file.type === "image/png" ? "png" : "jpg";
  const filename = `id-${user.id}-${crypto.randomBytes(6).toString("hex")}.${ext}`;
  const buf = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(path.join(UPLOAD_DIR, filename), buf);

  getDb()
    .prepare("UPDATE users SET id_status = 'pending', id_filename = ?, id_reject_reason = NULL WHERE id = ?")
    .run(filename, user.id);
  audit(user.email, "id_uploaded", `ID document uploaded (${ext})`);
  revalidatePath("/onboarding");
  return {};
}

// ---------- payment (TEST MODE) + quiz ----------

export async function payForQuiz(formData: FormData) {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  const courseId = Number(formData.get("courseId"));
  const db = getDb();
  const course = db
    .prepare("SELECT id, title, price_inr FROM courses WHERE id = ? AND published = 1")
    .get(courseId) as { id: number; title: string; price_inr: number } | undefined;
  if (!course) redirect("/courses");
  if (!user.phone_verified || user.id_status !== "approved") redirect("/onboarding");

  // TEST MODE: records a successful payment without moving real money.
  // The production integration replaces this with a Razorpay order +
  // checkout + webhook confirmation.
  db.prepare(
    "INSERT INTO payments (user_id, course_id, amount_inr, status, mode) VALUES (?, ?, ?, 'paid', 'test')"
  ).run(user.id, course.id, course.price_inr);
  audit(user.email, "payment_test", `Test-mode payment of INR ${course.price_inr} for "${course.title}"`);
  redirect(`/courses/${course.id}/quiz`);
}

export async function startAttempt(courseId: number): Promise<{ attemptId?: number; error?: string }> {
  const user = await getSessionUser();
  if (!user) return { error: "Please log in first." };
  const db = getDb();

  const open = db
    .prepare(
      "SELECT id FROM attempts WHERE user_id = ? AND course_id = ? AND submitted_at IS NULL AND deadline > datetime('now')"
    )
    .get(user.id, courseId) as { id: number } | undefined;
  if (open) return { attemptId: open.id };

  const payment = db
    .prepare(
      "SELECT id FROM payments WHERE user_id = ? AND course_id = ? AND status = 'paid' AND consumed = 0 ORDER BY id LIMIT 1"
    )
    .get(user.id, courseId) as { id: number } | undefined;
  if (!payment) return { error: "no_payment" };

  const questions = db
    .prepare("SELECT id FROM quiz_questions WHERE course_id = ?")
    .all(courseId) as { id: number }[];
  const shuffled = questions.map((q) => q.id).sort(() => Math.random() - 0.5);
  const chosen = shuffled.slice(0, Math.min(EXAM_QUESTIONS_PER_ATTEMPT, shuffled.length));

  db.prepare("UPDATE payments SET consumed = 1 WHERE id = ?").run(payment.id);
  const res = db
    .prepare(
      `INSERT INTO attempts (user_id, course_id, payment_id, question_ids, deadline)
       VALUES (?, ?, ?, ?, datetime('now', '+${EXAM_MINUTES} minutes'))`
    )
    .run(user.id, courseId, payment.id, JSON.stringify(chosen));
  return { attemptId: Number(res.lastInsertRowid) };
}

export async function submitQuiz(
  attemptId: number,
  answers: Record<string, number>
): Promise<{ passed?: boolean; score?: number; total?: number; error?: string }> {
  const user = await getSessionUser();
  if (!user) return { error: "Please log in first." };
  const db = getDb();
  const attempt = db
    .prepare("SELECT * FROM attempts WHERE id = ? AND user_id = ? AND submitted_at IS NULL")
    .get(attemptId, user.id) as
    | { id: number; course_id: number; question_ids: string; deadline: string }
    | undefined;
  if (!attempt) return { error: "This attempt was already submitted or does not exist." };

  const ids = JSON.parse(attempt.question_ids) as number[];
  const rows = db
    .prepare(`SELECT id, correct_index FROM quiz_questions WHERE id IN (${ids.map(() => "?").join(",")})`)
    .all(...ids) as { id: number; correct_index: number }[];
  const correctMap = new Map(rows.map((r) => [r.id, r.correct_index]));

  // Late submissions (after the deadline plus a small grace period) score 0.
  const late =
    (db.prepare("SELECT datetime('now') > datetime(?, '+15 seconds') AS late").get(attempt.deadline) as {
      late: number;
    }).late === 1;

  let score = 0;
  if (!late) {
    for (const id of ids) {
      if (answers[String(id)] === correctMap.get(id)) score++;
    }
  }
  const total = ids.length;
  const passed = !late && score * 100 >= EXAM_PASS_PERCENT * total;

  db.prepare("UPDATE attempts SET submitted_at = datetime('now'), score = ?, total = ?, passed = ? WHERE id = ?").run(
    score,
    total,
    passed ? 1 : 0,
    attemptId
  );

  if (passed) {
    db.prepare("INSERT OR IGNORE INTO unlocks (user_id, course_id) VALUES (?, ?)").run(user.id, attempt.course_id);
    const vid = newVerificationId();
    db.prepare(
      "INSERT INTO certificates (verification_id, user_id, course_id, kind, name_on_cert) VALUES (?, ?, ?, 'quiz', ?)"
    ).run(vid, user.id, attempt.course_id, user.name);
    audit(user.email, "quiz_passed", `Course ${attempt.course_id}: ${score}/${total}, certificate ${vid}`);
  } else {
    audit(user.email, "quiz_failed", `Course ${attempt.course_id}: ${score}/${total}${late ? " (late)" : ""}`);
  }
  return { passed, score, total };
}

// ---------- lessons & completion ----------

export async function completeLesson(formData: FormData) {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  const courseId = Number(formData.get("courseId"));
  const position = Number(formData.get("position"));
  const db = getDb();
  const unlocked = db.prepare("SELECT 1 FROM unlocks WHERE user_id = ? AND course_id = ?").get(user.id, courseId);
  if (!unlocked) redirect(`/courses/${courseId}`);

  db.prepare("INSERT OR IGNORE INTO progress (user_id, course_id, position) VALUES (?, ?, ?)").run(
    user.id,
    courseId,
    position
  );

  const totalLessons = (
    db.prepare("SELECT COUNT(DISTINCT position) AS c FROM lessons WHERE course_id = ?").get(courseId) as { c: number }
  ).c;
  const done = (
    db.prepare("SELECT COUNT(*) AS c FROM progress WHERE user_id = ? AND course_id = ?").get(user.id, courseId) as {
      c: number;
    }
  ).c;

  if (done >= totalLessons) {
    const existing = db
      .prepare("SELECT 1 FROM certificates WHERE user_id = ? AND course_id = ? AND kind = 'completion'")
      .get(user.id, courseId);
    if (!existing) {
      const vid = newVerificationId();
      db.prepare(
        "INSERT INTO certificates (verification_id, user_id, course_id, kind, name_on_cert) VALUES (?, ?, ?, 'completion', ?)"
      ).run(vid, user.id, courseId, user.name);
      audit(user.email, "course_completed", `Course ${courseId} completed, certificate ${vid}`);
    }
  }
  revalidatePath(`/courses/${courseId}`);
  redirect(`/courses/${courseId}`);
}

export async function reportError(prev: unknown, formData: FormData): Promise<{ ok?: boolean; error?: string }> {
  const user = await getSessionUser();
  if (!user) return { error: "Please log in first." };
  const courseId = Number(formData.get("courseId"));
  const position = Number(formData.get("position"));
  const message = String(formData.get("message") ?? "").trim();
  if (message.length < 10) return { error: "Please describe the error in a little more detail." };
  getDb()
    .prepare("INSERT INTO reports (course_id, position, user_id, message) VALUES (?, ?, ?, ?)")
    .run(courseId, position, user.id, message.slice(0, 2000));
  audit(user.email, "error_reported", `Course ${courseId} lesson ${position}`);
  return { ok: true };
}

// ---------- AI course generation ----------

export async function requestCourse(prev: unknown, formData: FormData): Promise<{ error?: string; slug?: string }> {
  const user = await getSessionUser();
  if (!user) return { error: "Please log in to request a course." };
  const topic = String(formData.get("topic") ?? "").trim();
  if (topic.length < 3 || topic.length > 120) return { error: "Please enter a topic between 3 and 120 characters." };
  if (!aiAvailable())
    return {
      error:
        "AI generation is not active yet in this pilot: the owner has not added an AI provider key. The four demo courses are fully functional.",
    };

  const db = getDb();
  const day = new Date().toISOString().slice(0, 10);
  const gen = db.prepare("SELECT count FROM generations WHERE user_id = ? AND day = ?").get(user.id, day) as
    | { count: number }
    | undefined;
  if ((gen?.count ?? 0) >= FREE_DAILY_GENERATIONS)
    return { error: `Daily limit reached (${FREE_DAILY_GENERATIONS} new courses per day on the free tier). Try again tomorrow.` };

  let course;
  try {
    course = await generateCourse(topic, user.language);
  } catch (e) {
    return { error: `Generation failed: ${e instanceof Error ? e.message : "unknown error"}` };
  }

  const slug =
    topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) +
    "-" +
    crypto.randomBytes(3).toString("hex");

  // Instant publication per the decided content policy; owner oversight via audit log and unpublish.
  const res = db
    .prepare(
      "INSERT INTO courses (slug, title, description, category, tier, price_inr, published, created_by) VALUES (?, ?, ?, 'general', 3, 499, 1, 'ai')"
    )
    .run(slug, course.title.slice(0, 150), course.description.slice(0, 500));
  const courseId = Number(res.lastInsertRowid);
  const insertLesson = db.prepare(
    "INSERT INTO lessons (course_id, position, language, title, content) VALUES (?, ?, ?, ?, ?)"
  );
  course.lessons.slice(0, 5).forEach((l, i) => insertLesson.run(courseId, i + 1, user.language, l.title, l.content));
  const insertQ = db.prepare("INSERT INTO quiz_questions (course_id, question, options, correct_index) VALUES (?, ?, ?, ?)");
  course.questions.slice(0, 10).forEach((qq) => insertQ.run(courseId, qq.q, JSON.stringify(qq.options), qq.correct));

  db.prepare(
    "INSERT INTO generations (user_id, day, count) VALUES (?, ?, 1) ON CONFLICT(user_id, day) DO UPDATE SET count = count + 1"
  ).run(user.id, day);
  audit(user.email, "course_generated", `"${course.title}" (id ${courseId}) published instantly`);
  return { slug };
}

// ---------- admin ----------

async function requireAdmin() {
  const user = await getSessionUser();
  if (!user || !user.is_admin) redirect("/login");
  return user;
}

export async function reviewId(formData: FormData) {
  const admin = await requireAdmin();
  const userId = Number(formData.get("userId"));
  const decision = String(formData.get("decision"));
  const reason = String(formData.get("reason") ?? "").trim();
  const db = getDb();
  if (decision === "approve") {
    db.prepare("UPDATE users SET id_status = 'approved', id_reject_reason = NULL WHERE id = ?").run(userId);
    audit(admin.email, "id_approved", `User ${userId}`);
  } else {
    db.prepare("UPDATE users SET id_status = 'rejected', id_reject_reason = ? WHERE id = ?").run(
      reason || "Document unclear — please upload again.",
      userId
    );
    audit(admin.email, "id_rejected", `User ${userId}: ${reason || "no reason given"}`);
  }
  revalidatePath("/admin");
}

export async function resolveReport(formData: FormData) {
  const admin = await requireAdmin();
  const reportId = Number(formData.get("reportId"));
  const status = String(formData.get("status")) === "fixed" ? "fixed" : "dismissed";
  getDb().prepare("UPDATE reports SET status = ? WHERE id = ?").run(status, reportId);
  audit(admin.email, "report_" + status, `Report ${reportId}`);
  revalidatePath("/admin");
}

export async function togglePublish(formData: FormData) {
  const admin = await requireAdmin();
  const courseId = Number(formData.get("courseId"));
  const db = getDb();
  const course = db.prepare("SELECT published, title FROM courses WHERE id = ?").get(courseId) as
    | { published: number; title: string }
    | undefined;
  if (course) {
    db.prepare("UPDATE courses SET published = ? WHERE id = ?").run(course.published ? 0 : 1, courseId);
    audit(admin.email, course.published ? "course_unpublished" : "course_republished", `"${course.title}" (id ${courseId})`);
  }
  revalidatePath("/admin");
  revalidatePath("/courses");
}
