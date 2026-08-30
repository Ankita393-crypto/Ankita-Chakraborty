import type { Database } from "better-sqlite3";
import bcrypt from "bcryptjs";
import type { SeedCourse } from "./seed-types";
import { class10Maths } from "./seed-courses/maths";
import { oceanography } from "./seed-courses/oceanography";
import { awsCloudPractitioner } from "./seed-courses/aws";
import { sscGeneralAwareness } from "./seed-courses/ssc";

const courses: SeedCourse[] = [class10Maths, oceanography, awsCloudPractitioner, sscGeneralAwareness];

export function seed(db: Database) {
  const adminEmail = "admin@learnzy.test";
  const adminPass = process.env.ADMIN_PASSWORD || "admin123";
  db.prepare(
    "INSERT INTO users (email, password_hash, name, phone, phone_verified, id_status, is_admin) VALUES (?, ?, ?, ?, 1, 'approved', 1)"
  ).run(adminEmail, bcrypt.hashSync(adminPass, 10), "Learnzy Admin", "+910000000000");

  const insertCourse = db.prepare(
    "INSERT INTO courses (slug, title, description, category, tier, price_inr, created_by) VALUES (?, ?, ?, ?, ?, ?, 'seed')"
  );
  const insertLesson = db.prepare(
    "INSERT INTO lessons (course_id, position, language, title, content) VALUES (?, ?, 'en', ?, ?)"
  );
  const insertQuestion = db.prepare(
    "INSERT INTO quiz_questions (course_id, question, options, correct_index) VALUES (?, ?, ?, ?)"
  );

  for (const c of courses) {
    const res = insertCourse.run(c.slug, c.title, c.description, c.category, c.tier, c.price_inr);
    const courseId = Number(res.lastInsertRowid);
    c.lessons.forEach((l, i) => insertLesson.run(courseId, i + 1, l.title, l.content));
    c.questions.forEach((qq) => insertQuestion.run(courseId, qq.q, JSON.stringify(qq.options), qq.correct));
  }
}
