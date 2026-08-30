import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import { seed } from "./seed";

const DB_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "learnzy.db");

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (db) return db;
  fs.mkdirSync(DB_DIR, { recursive: true });
  db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  migrate(db);
  return db;
}

function migrate(db: Database.Database) {
  db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    phone TEXT,
    phone_verified INTEGER NOT NULL DEFAULT 0,
    language TEXT NOT NULL DEFAULT 'en',
    id_status TEXT NOT NULL DEFAULT 'none', -- none | pending | approved | rejected
    id_filename TEXT,
    id_reject_reason TEXT,
    is_admin INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS sessions (
    token TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS otp_codes (
    user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    code TEXT NOT NULL,
    expires_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'general', -- general | certprep | mock
    tier INTEGER NOT NULL DEFAULT 3,
    price_inr INTEGER NOT NULL DEFAULT 499,
    published INTEGER NOT NULL DEFAULT 1,
    created_by TEXT NOT NULL DEFAULT 'seed', -- seed | ai | admin
    -- Mock-exam configuration (NULL for regular courses, which use the
    -- entrance-exam defaults from lib/config.ts):
    exam_minutes INTEGER,       -- paper duration, e.g. 120 for UPSC GS Paper I
    marks_correct REAL,         -- marks awarded per correct answer
    marks_wrong REAL,           -- marks DEDUCTED per wrong answer (negative marking)
    paper_count INTEGER,        -- number of papers in the mock series (bunch), e.g. 1000
    paper_size INTEGER,         -- questions per paper, e.g. 100 (GS) / 80 (CSAT)
    subject_quota TEXT,         -- JSON {subject: questions-per-paper} mirroring the real mix
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS lessons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    position INTEGER NOT NULL,
    language TEXT NOT NULL DEFAULT 'en',
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    UNIQUE(course_id, position, language)
  );

  CREATE TABLE IF NOT EXISTS quiz_questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    options TEXT NOT NULL, -- JSON array of 4 strings
    correct_index INTEGER NOT NULL,
    subject TEXT,          -- e.g. 'Indian Polity' — powers the weakness report
    explanation TEXT,      -- shown in the answer paper after submission
    origin TEXT NOT NULL DEFAULT 'seed' -- seed (hand-verified) | ai (generated, spot-check)
  );

  CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    amount_inr INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'paid', -- paid (test mode always succeeds)
    mode TEXT NOT NULL DEFAULT 'test', -- test | razorpay (future)
    consumed INTEGER NOT NULL DEFAULT 0, -- 1 once an attempt has used it
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS attempts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    payment_id INTEGER NOT NULL REFERENCES payments(id),
    question_ids TEXT NOT NULL, -- JSON array chosen for this attempt
    started_at TEXT NOT NULL DEFAULT (datetime('now')),
    deadline TEXT NOT NULL,
    submitted_at TEXT,
    score INTEGER,
    total INTEGER,
    passed INTEGER,
    answers TEXT,          -- JSON map of question id -> chosen option index
    marks REAL,            -- final marks after negative marking (mock exams)
    paper_no INTEGER       -- which paper of the mock series (1-based), NULL for entrance exams
  );

  CREATE TABLE IF NOT EXISTS unlocks (
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    unlocked_at TEXT NOT NULL DEFAULT (datetime('now')),
    PRIMARY KEY (user_id, course_id)
  );

  CREATE TABLE IF NOT EXISTS progress (
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    position INTEGER NOT NULL,
    completed_at TEXT NOT NULL DEFAULT (datetime('now')),
    PRIMARY KEY (user_id, course_id, position)
  );

  CREATE TABLE IF NOT EXISTS certificates (
    verification_id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    kind TEXT NOT NULL, -- quiz | completion
    name_on_cert TEXT NOT NULL,
    issued_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    position INTEGER NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'open', -- open | fixed | dismissed
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS generations (
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    day TEXT NOT NULL,
    count INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (user_id, day)
  );

  CREATE TABLE IF NOT EXISTS subject_notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    subject TEXT NOT NULL,
    language TEXT NOT NULL DEFAULT 'en',
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    source TEXT NOT NULL DEFAULT 'ai', -- ai | seed | admin
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE(subject, language)
  );

  CREATE TABLE IF NOT EXISTS audit_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    actor TEXT NOT NULL,
    action TEXT NOT NULL,
    detail TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  `);

  const count = (db.prepare("SELECT COUNT(*) AS c FROM courses").get() as { c: number }).c;
  if (count === 0) seed(db);
}

export function audit(actor: string, action: string, detail: string) {
  getDb()
    .prepare("INSERT INTO audit_log (actor, action, detail) VALUES (?, ?, ?)")
    .run(actor, action, detail);
}
