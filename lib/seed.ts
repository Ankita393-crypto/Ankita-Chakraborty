import type { Db } from "mongodb";
import bcrypt from "bcryptjs";
import type { SeedCourse, SeedMock } from "./seed-types";
import { nextId, now } from "./db";
import { upscGs1Mock } from "./seed-mocks/upsc-gs1";
import { upscCsatMock } from "./seed-mocks/upsc-csat";
import { class10Maths } from "./seed-courses/maths";
import { oceanography } from "./seed-courses/oceanography";
import { awsCloudPractitioner } from "./seed-courses/aws";
import { sscGeneralAwareness } from "./seed-courses/ssc";
import { quantitativeAptitude } from "./seed-courses/quant";
import { reasoningGovtExams } from "./seed-courses/reasoning";
import { englishGovtExams } from "./seed-courses/english";

const courses: SeedCourse[] = [
  class10Maths,
  oceanography,
  awsCloudPractitioner,
  sscGeneralAwareness,
  quantitativeAptitude,
  reasoningGovtExams,
  englishGovtExams,
];

export async function seed(db: Db) {
  const adminEmail = "admin@learnzy.test";
  const adminPass = process.env.ADMIN_PASSWORD || "admin123";
  await db.collection("users").insertOne({
    id: await nextId(db, "users"),
    email: adminEmail,
    password_hash: bcrypt.hashSync(adminPass, 10),
    name: "Learnzy Admin",
    phone: "+910000000000",
    phone_verified: 1,
    language: "en",
    id_status: "approved",
    id_filename: null,
    id_reject_reason: null,
    is_admin: 1,
    created_at: now(),
  });

  for (const c of courses) {
    const courseId = await nextId(db, "courses");
    await db.collection("courses").insertOne({
      id: courseId,
      slug: c.slug,
      title: c.title,
      description: c.description,
      category: c.category,
      tier: c.tier,
      price_inr: c.price_inr,
      published: 1,
      created_by: "seed",
      exam_minutes: null,
      marks_correct: null,
      marks_wrong: null,
      paper_count: null,
      paper_size: null,
      subject_quota: null,
      created_at: now(),
    });
    if (c.lessons.length > 0) {
      await db.collection("lessons").insertMany(
        c.lessons.map((l, i) => ({
          course_id: courseId,
          position: i + 1,
          language: "en",
          title: l.title,
          content: l.content,
        }))
      );
    }
    for (const qq of c.questions) {
      await db.collection("quiz_questions").insertOne({
        id: await nextId(db, "quiz_questions"),
        course_id: courseId,
        question: qq.q,
        options: JSON.stringify(qq.options),
        correct_index: qq.correct,
        subject: null,
        explanation: null,
        origin: "seed",
      });
    }
  }

  const mocks: SeedMock[] = [upscGs1Mock, upscCsatMock];
  for (const m of mocks) {
    const mockId = await nextId(db, "courses");
    await db.collection("courses").insertOne({
      id: mockId,
      slug: m.slug,
      title: m.title,
      description: m.description,
      category: "mock",
      tier: 5,
      price_inr: m.price_inr,
      published: 1,
      created_by: "seed",
      exam_minutes: m.exam_minutes,
      marks_correct: m.marks_correct,
      marks_wrong: m.marks_wrong,
      paper_count: m.paper_count,
      paper_size: m.paper_size,
      subject_quota: JSON.stringify(m.subject_quota),
      created_at: now(),
    });
    for (const qq of m.questions) {
      await db.collection("quiz_questions").insertOne({
        id: await nextId(db, "quiz_questions"),
        course_id: mockId,
        question: qq.q,
        options: JSON.stringify(qq.options),
        correct_index: qq.correct,
        subject: qq.subject,
        explanation: qq.explanation,
        origin: "seed",
      });
    }
  }
}
