"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { getDb, audit, nextId, now, parseDbDate } from "@/lib/db";
import { createSession, destroySession, getSessionUser } from "@/lib/auth";
import { aiAvailable, generateCourse, generateBankQuestions } from "@/lib/ai";
import { composePaper } from "@/lib/mock";

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

  const db = await getDb();
  const existing = await db.collection("users").findOne({ email });
  if (existing) return { error: "An account with this email already exists. Try logging in." };

  const userId = await nextId(db, "users");
  await db.collection("users").insertOne({
    id: userId,
    email,
    password_hash: bcrypt.hashSync(password, 10),
    name,
    phone: phone.replace(/[\s-]/g, ""),
    phone_verified: 0,
    language: "en",
    id_status: "none",
    id_filename: null,
    id_reject_reason: null,
    is_admin: 0,
    created_at: now(),
  });
  await createSession(userId);
  await audit(email, "register", "New account created");
  redirect("/onboarding");
}

export async function login(prev: unknown, formData: FormData): Promise<{ error?: string }> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const db = await getDb();
  const user = (await db.collection("users").findOne({ email })) as {
    id: number;
    password_hash: string;
  } | null;
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
  const db = await getDb();
  await db.collection("otp_codes").updateOne(
    { user_id: user.id },
    { $set: { code, expires_at: now(10 * 60) } },
    { upsert: true }
  );
  // PILOT MODE: the code is returned to the screen instead of being sent by
  // SMS. In production this call goes to an SMS provider and the code is
  // never revealed in the response.
  return { code };
}

export async function verifyOtp(prev: unknown, formData: FormData): Promise<{ error?: string }> {
  const user = await getSessionUser();
  if (!user) return { error: "Please log in first." };
  const code = String(formData.get("code") ?? "").trim();
  const db = await getDb();
  const row = (await db.collection("otp_codes").findOne({ user_id: user.id })) as {
    code: string;
    expires_at: string;
  } | null;
  if (!row || row.expires_at <= now() || row.code !== code)
    return { error: "That code is wrong or has expired. Send a new one." };
  await db.collection("users").updateOne({ id: user.id }, { $set: { phone_verified: 1 } });
  await db.collection("otp_codes").deleteOne({ user_id: user.id });
  await audit(user.email, "phone_verified", "Phone verified (pilot mode OTP)");
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

  const db = await getDb();
  await db
    .collection("users")
    .updateOne({ id: user.id }, { $set: { id_status: "pending", id_filename: filename, id_reject_reason: null } });
  await audit(user.email, "id_uploaded", `ID document uploaded (${ext})`);
  revalidatePath("/onboarding");
  return {};
}

// ---------- payment (TEST MODE) + quiz ----------

export async function payForQuiz(formData: FormData) {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  const courseId = Number(formData.get("courseId"));
  const db = await getDb();
  const course = (await db.collection("courses").findOne({ id: courseId, published: 1 })) as {
    id: number;
    title: string;
    price_inr: number;
    category: string;
  } | null;
  if (!course) redirect("/courses");
  if (!user.phone_verified || user.id_status !== "approved") redirect("/onboarding");

  const isMock = course.category === "mock";
  if (isMock) {
    // Mock series is a ONE-TIME purchase: pay once, every paper in the
    // series is unlocked forever. Repeat purchases are refused.
    const already = await db.collection("unlocks").findOne({ user_id: user.id, course_id: courseId });
    if (already) redirect(`/courses/${course.id}`);
  }

  // TEST MODE: records a successful payment without moving real money.
  // The production integration replaces this with a Razorpay order +
  // checkout + webhook confirmation.
  await db.collection("payments").insertOne({
    id: await nextId(db, "payments"),
    user_id: user.id,
    course_id: course.id,
    amount_inr: course.price_inr,
    status: "paid",
    mode: "test",
    consumed: isMock ? 1 : 0,
    created_at: now(),
  });
  await audit(user.email, "payment_test", `Test-mode payment of INR ${course.price_inr} for "${course.title}"`);

  if (isMock) {
    await db.collection("unlocks").updateOne(
      { user_id: user.id, course_id: course.id },
      { $setOnInsert: { unlocked_at: now() } },
      { upsert: true }
    );
    await audit(user.email, "mock_series_unlocked", `"${course.title}" unlocked (one-time purchase)`);
    redirect(`/courses/${course.id}`);
  }
  redirect(`/courses/${course.id}/quiz`);
}

export async function startAttempt(courseId: number, paperNo?: number): Promise<{ attemptId?: number; error?: string }> {
  const user = await getSessionUser();
  if (!user) return { error: "Please log in first." };
  const db = await getDb();

  const course = (await db.collection("courses").findOne({ id: courseId })) as {
    category: string;
    exam_minutes: number | null;
    paper_count: number | null;
  } | null;
  if (!course) return { error: "no_payment" };
  const isMock = course.category === "mock";

  if (isMock) {
    // Mock series: access comes from the one-time purchase (unlock), and a
    // specific paper number of the series is being sat.
    const paper = Math.floor(paperNo ?? 0);
    if (!paper || paper < 1 || paper > (course.paper_count ?? 1)) return { error: "bad_paper" };
    const unlocked = await db.collection("unlocks").findOne({ user_id: user.id, course_id: courseId });
    if (!unlocked) return { error: "no_payment" };

    const openMock = (await db.collection("attempts").findOne({
      user_id: user.id,
      course_id: courseId,
      paper_no: paper,
      submitted_at: null,
      deadline: { $gt: now() },
    })) as { id: number } | null;
    if (openMock) return { attemptId: openMock.id };

    const payment = (await db
      .collection("payments")
      .find({ user_id: user.id, course_id: courseId, status: "paid" })
      .sort({ id: 1 })
      .limit(1)
      .next()) as { id: number } | null;
    if (!payment) return { error: "no_payment" };

    const chosen = await composePaper(db, courseId, paper);
    if (chosen.length === 0) return { error: "bad_paper" };
    const minutes = course.exam_minutes ?? EXAM_MINUTES;
    const attemptId = await nextId(db, "attempts");
    await db.collection("attempts").insertOne({
      id: attemptId,
      user_id: user.id,
      course_id: courseId,
      payment_id: payment.id,
      question_ids: JSON.stringify(chosen),
      started_at: now(),
      deadline: now(minutes * 60),
      submitted_at: null,
      score: null,
      total: null,
      passed: null,
      answers: null,
      marks: null,
      paper_no: paper,
    });
    return { attemptId };
  }

  const open = (await db.collection("attempts").findOne({
    user_id: user.id,
    course_id: courseId,
    submitted_at: null,
    deadline: { $gt: now() },
  })) as { id: number } | null;
  if (open) return { attemptId: open.id };

  const payment = (await db
    .collection("payments")
    .find({ user_id: user.id, course_id: courseId, status: "paid", consumed: 0 })
    .sort({ id: 1 })
    .limit(1)
    .next()) as { id: number } | null;
  if (!payment) return { error: "no_payment" };

  const questions = (await db
    .collection("quiz_questions")
    .find({ course_id: courseId }, { projection: { id: 1 } })
    .sort({ id: 1 })
    .toArray()) as unknown as { id: number }[];
  const shuffled = questions.map((q) => q.id).sort(() => Math.random() - 0.5);
  const chosen = shuffled.slice(0, Math.min(EXAM_QUESTIONS_PER_ATTEMPT, shuffled.length));

  await db.collection("payments").updateOne({ id: payment.id }, { $set: { consumed: 1 } });
  const attemptId = await nextId(db, "attempts");
  await db.collection("attempts").insertOne({
    id: attemptId,
    user_id: user.id,
    course_id: courseId,
    payment_id: payment.id,
    question_ids: JSON.stringify(chosen),
    started_at: now(),
    deadline: now(EXAM_MINUTES * 60),
    submitted_at: null,
    score: null,
    total: null,
    passed: null,
    answers: null,
    marks: null,
    paper_no: null,
  });
  return { attemptId };
}

export async function submitQuiz(
  attemptId: number,
  answers: Record<string, number>
): Promise<{
  passed?: boolean;
  score?: number;
  total?: number;
  error?: string;
  mock?: boolean;
  marks?: number;
  maxMarks?: number;
  attemptId?: number;
}> {
  const user = await getSessionUser();
  if (!user) return { error: "Please log in first." };
  const db = await getDb();
  const attempt = (await db
    .collection("attempts")
    .findOne({ id: attemptId, user_id: user.id, submitted_at: null })) as {
    id: number;
    course_id: number;
    question_ids: string;
    deadline: string;
  } | null;
  if (!attempt) return { error: "This attempt was already submitted or does not exist." };

  const course = (await db.collection("courses").findOne({ id: attempt.course_id })) as {
    category: string;
    marks_correct: number | null;
    marks_wrong: number | null;
  } | null;
  if (!course) return { error: "Course not found." };
  const isMock = course.category === "mock";

  const ids = JSON.parse(attempt.question_ids) as number[];
  const rows = (await db
    .collection("quiz_questions")
    .find({ id: { $in: ids } }, { projection: { id: 1, correct_index: 1 } })
    .toArray()) as unknown as { id: number; correct_index: number }[];
  const correctMap = new Map(rows.map((r) => [r.id, r.correct_index]));

  // Late submissions (after the deadline plus a small grace period) score 0.
  const late = Date.now() > parseDbDate(attempt.deadline) + 15_000;

  let score = 0;
  let wrong = 0;
  if (!late) {
    for (const id of ids) {
      const chosen = answers[String(id)];
      if (chosen === undefined || chosen === null) continue;
      if (chosen === correctMap.get(id)) score++;
      else wrong++;
    }
  }
  const total = ids.length;

  if (isMock) {
    // Real-exam scoring with negative marking; no pass/fail, no certificate —
    // the product here is the answer paper and the weakness report.
    const mc = course.marks_correct ?? 1;
    const mw = course.marks_wrong ?? 0;
    const marks = Math.round((score * mc - wrong * mw) * 100) / 100;
    const maxMarks = Math.round(total * mc * 100) / 100;
    await db.collection("attempts").updateOne(
      { id: attemptId },
      { $set: { submitted_at: now(), score, total, passed: null, answers: JSON.stringify(answers), marks } }
    );
    await audit(
      user.email,
      "mock_submitted",
      `Mock ${attempt.course_id}: ${score} correct, ${wrong} wrong, ${marks}/${maxMarks} marks${late ? " (late)" : ""}`
    );
    return { mock: true, score, total, marks, maxMarks, attemptId };
  }

  const passed = !late && score * 100 >= EXAM_PASS_PERCENT * total;

  await db.collection("attempts").updateOne(
    { id: attemptId },
    { $set: { submitted_at: now(), score, total, passed: passed ? 1 : 0, answers: JSON.stringify(answers) } }
  );

  if (passed) {
    await db.collection("unlocks").updateOne(
      { user_id: user.id, course_id: attempt.course_id },
      { $setOnInsert: { unlocked_at: now() } },
      { upsert: true }
    );
    const vid = newVerificationId();
    await db.collection("certificates").insertOne({
      verification_id: vid,
      user_id: user.id,
      course_id: attempt.course_id,
      kind: "quiz",
      name_on_cert: user.name,
      issued_at: now(),
    });
    await audit(user.email, "quiz_passed", `Course ${attempt.course_id}: ${score}/${total}, certificate ${vid}`);
  } else {
    await audit(user.email, "quiz_failed", `Course ${attempt.course_id}: ${score}/${total}${late ? " (late)" : ""}`);
  }
  return { passed, score, total };
}

// ---------- lessons & completion ----------

export async function completeLesson(formData: FormData) {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  const courseId = Number(formData.get("courseId"));
  const position = Number(formData.get("position"));
  const db = await getDb();
  const unlocked = await db.collection("unlocks").findOne({ user_id: user.id, course_id: courseId });
  if (!unlocked) redirect(`/courses/${courseId}`);

  await db.collection("progress").updateOne(
    { user_id: user.id, course_id: courseId, position },
    { $setOnInsert: { completed_at: now() } },
    { upsert: true }
  );

  const positions = await db.collection("lessons").distinct("position", { course_id: courseId });
  const totalLessons = positions.length;
  const done = await db.collection("progress").countDocuments({ user_id: user.id, course_id: courseId });

  if (done >= totalLessons) {
    const existing = await db
      .collection("certificates")
      .findOne({ user_id: user.id, course_id: courseId, kind: "completion" });
    if (!existing) {
      const vid = newVerificationId();
      await db.collection("certificates").insertOne({
        verification_id: vid,
        user_id: user.id,
        course_id: courseId,
        kind: "completion",
        name_on_cert: user.name,
        issued_at: now(),
      });
      await audit(user.email, "course_completed", `Course ${courseId} completed, certificate ${vid}`);
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
  const db = await getDb();
  await db.collection("reports").insertOne({
    id: await nextId(db, "reports"),
    course_id: courseId,
    position,
    user_id: user.id,
    message: message.slice(0, 2000),
    status: "open",
    created_at: now(),
  });
  await audit(user.email, "error_reported", `Course ${courseId} lesson ${position}`);
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

  const db = await getDb();
  const day = new Date().toISOString().slice(0, 10);
  const gen = (await db.collection("generations").findOne({ user_id: user.id, day })) as { count: number } | null;
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
  const courseId = await nextId(db, "courses");
  await db.collection("courses").insertOne({
    id: courseId,
    slug,
    title: course.title.slice(0, 150),
    description: course.description.slice(0, 500),
    category: "general",
    tier: 3,
    price_inr: 499,
    published: 1,
    created_by: "ai",
    exam_minutes: null,
    marks_correct: null,
    marks_wrong: null,
    paper_count: null,
    paper_size: null,
    subject_quota: null,
    created_at: now(),
  });
  const lessons = course.lessons.slice(0, 5).map((l, i) => ({
    course_id: courseId,
    position: i + 1,
    language: user.language,
    title: l.title,
    content: l.content,
  }));
  if (lessons.length > 0) await db.collection("lessons").insertMany(lessons);
  for (const qq of course.questions.slice(0, 10)) {
    await db.collection("quiz_questions").insertOne({
      id: await nextId(db, "quiz_questions"),
      course_id: courseId,
      question: qq.q,
      options: JSON.stringify(qq.options),
      correct_index: qq.correct,
      subject: null,
      explanation: null,
      origin: "ai",
    });
  }

  await db.collection("generations").updateOne({ user_id: user.id, day }, { $inc: { count: 1 } }, { upsert: true });
  await audit(user.email, "course_generated", `"${course.title}" (id ${courseId}) published instantly`);
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
  const db = await getDb();
  if (decision === "approve") {
    await db.collection("users").updateOne({ id: userId }, { $set: { id_status: "approved", id_reject_reason: null } });
    await audit(admin.email, "id_approved", `User ${userId}`);
  } else {
    await db.collection("users").updateOne(
      { id: userId },
      { $set: { id_status: "rejected", id_reject_reason: reason || "Document unclear — please upload again." } }
    );
    await audit(admin.email, "id_rejected", `User ${userId}: ${reason || "no reason given"}`);
  }
  revalidatePath("/admin");
}

export async function resolveReport(formData: FormData) {
  const admin = await requireAdmin();
  const reportId = Number(formData.get("reportId"));
  const status = String(formData.get("status")) === "fixed" ? "fixed" : "dismissed";
  const db = await getDb();
  await db.collection("reports").updateOne({ id: reportId }, { $set: { status } });
  await audit(admin.email, "report_" + status, `Report ${reportId}`);
  revalidatePath("/admin");
}

// Grows a mock series' question bank with AI ("generate by permutation and
// combination": papers are composed from the bank, so a bigger bank means
// more distinct papers). Admin-only; AI questions are tagged origin='ai'.
export async function growQuestionBank(formData: FormData) {
  const admin = await getSessionUser();
  if (!admin || !admin.is_admin) redirect("/login");

  const courseId = Number(formData.get("courseId"));
  const subject = String(formData.get("subject") ?? "").trim();
  const count = Math.min(Math.max(Number(formData.get("count")) || 10, 1), 25);
  const db = await getDb();
  const course = (await db.collection("courses").findOne({ id: courseId, category: "mock" })) as {
    id: number;
    title: string;
  } | null;

  if (!course || !subject) {
    revalidatePath("/admin");
    return;
  }
  if (!aiAvailable()) {
    await audit(admin.email, "bank_grow_failed", `No OPENAI_API_KEY configured — cannot generate for "${course.title}"`);
    revalidatePath("/admin");
    return;
  }

  try {
    const generated = await generateBankQuestions(course.title, subject, count);
    let added = 0;
    for (const q of generated) {
      if (!q.q || !Array.isArray(q.options) || q.options.length !== 4) continue;
      if (typeof q.correct !== "number" || q.correct < 0 || q.correct > 3) continue;
      await db.collection("quiz_questions").insertOne({
        id: await nextId(db, "quiz_questions"),
        course_id: course.id,
        question: q.q,
        options: JSON.stringify(q.options),
        correct_index: q.correct,
        subject,
        explanation: q.explanation ?? "",
        origin: "ai",
      });
      added++;
    }
    await audit(admin.email, "bank_grown", `${added} AI questions added to "${course.title}" / ${subject} (tagged 'ai' for spot-checking)`);
  } catch (e) {
    await audit(admin.email, "bank_grow_failed", `"${course.title}" / ${subject}: ${e instanceof Error ? e.message : "unknown error"}`);
  }
  revalidatePath("/admin");
}

export async function togglePublish(formData: FormData) {
  const admin = await requireAdmin();
  const courseId = Number(formData.get("courseId"));
  const db = await getDb();
  const course = (await db.collection("courses").findOne({ id: courseId })) as {
    published: number;
    title: string;
  } | null;
  if (course) {
    await db.collection("courses").updateOne({ id: courseId }, { $set: { published: course.published ? 0 : 1 } });
    await audit(admin.email, course.published ? "course_unpublished" : "course_republished", `"${course.title}" (id ${courseId})`);
  }
  revalidatePath("/admin");
  revalidatePath("/courses");
}
