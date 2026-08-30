import { MongoClient, Db } from "mongodb";
import path from "path";
import fs from "fs";
import { seed } from "./seed";

// MongoDB data layer.
//
// Where the database lives is controlled by ONE setting:
//   - MONGODB_URI set (e.g. a free MongoDB Atlas cluster) -> connect to it.
//   - MONGODB_URI not set -> start an embedded local MongoDB automatically,
//     storing its files in ./data/mongo so data survives restarts. Zero
//     manual installation for the pilot.
//
// Conventions kept from the previous schema so the rest of the app reads
// the same shapes: every document carries a numeric `id` (allocated from a
// `counters` collection), booleans are 0/1, timestamps are UTC strings in
// the format "YYYY-MM-DD HH:MM:SS" (which compare correctly as strings),
// and JSON-ish fields (options, question_ids, answers, subject_quota) are
// stored as JSON strings.

type GlobalMongo = {
  dbPromise?: Promise<Db>;
};
const g = globalThis as unknown as { __learnzyMongo?: GlobalMongo };
if (!g.__learnzyMongo) g.__learnzyMongo = {};

export async function getDb(): Promise<Db> {
  if (!g.__learnzyMongo!.dbPromise) {
    g.__learnzyMongo!.dbPromise = init().catch((e) => {
      // A failed startup must not poison the cache forever.
      g.__learnzyMongo!.dbPromise = undefined;
      throw e;
    });
  }
  return g.__learnzyMongo!.dbPromise;
}

async function init(): Promise<Db> {
  let uri = process.env.MONGODB_URI;
  if (!uri) {
    const dbPath = path.join(process.cwd(), "data", "mongo");
    fs.mkdirSync(dbPath, { recursive: true });
    const { MongoMemoryServer } = await import("mongodb-memory-server");
    const mem = await MongoMemoryServer.create({
      instance: { dbPath, storageEngine: "wiredTiger" },
    });
    uri = mem.getUri();
  }
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(process.env.MONGODB_DB || "learnzy");
  await ensureIndexes(db);
  if ((await db.collection("courses").countDocuments()) === 0) {
    await seed(db);
  }
  return db;
}

async function ensureIndexes(db: Db) {
  await Promise.all([
    db.collection("users").createIndex({ id: 1 }, { unique: true }),
    db.collection("users").createIndex({ email: 1 }, { unique: true }),
    db.collection("sessions").createIndex({ token: 1 }, { unique: true }),
    db.collection("otp_codes").createIndex({ user_id: 1 }, { unique: true }),
    db.collection("courses").createIndex({ id: 1 }, { unique: true }),
    db.collection("courses").createIndex({ slug: 1 }, { unique: true }),
    db.collection("lessons").createIndex({ course_id: 1, position: 1, language: 1 }, { unique: true }),
    db.collection("quiz_questions").createIndex({ id: 1 }, { unique: true }),
    db.collection("quiz_questions").createIndex({ course_id: 1 }),
    db.collection("payments").createIndex({ id: 1 }, { unique: true }),
    db.collection("payments").createIndex({ user_id: 1, course_id: 1 }),
    db.collection("attempts").createIndex({ id: 1 }, { unique: true }),
    db.collection("attempts").createIndex({ user_id: 1, course_id: 1 }),
    db.collection("unlocks").createIndex({ user_id: 1, course_id: 1 }, { unique: true }),
    db.collection("progress").createIndex({ user_id: 1, course_id: 1, position: 1 }, { unique: true }),
    db.collection("certificates").createIndex({ verification_id: 1 }, { unique: true }),
    db.collection("reports").createIndex({ id: 1 }, { unique: true }),
    db.collection("generations").createIndex({ user_id: 1, day: 1 }, { unique: true }),
    db.collection("subject_notes").createIndex({ subject: 1, language: 1 }, { unique: true }),
  ]);
}

// UTC timestamp in "YYYY-MM-DD HH:MM:SS", same format (and string-comparison
// behaviour) as SQLite's datetime('now') that the app previously used.
export function now(offsetSeconds = 0): string {
  return new Date(Date.now() + offsetSeconds * 1000).toISOString().replace("T", " ").slice(0, 19);
}

export function parseDbDate(s: string): number {
  return Date.parse(s.replace(" ", "T") + "Z");
}

// Auto-increment numeric ids, one counter per collection.
export async function nextId(db: Db, name: string): Promise<number> {
  const res = await db
    .collection<{ _id: string; seq: number }>("counters")
    .findOneAndUpdate({ _id: name }, { $inc: { seq: 1 } }, { upsert: true, returnDocument: "after" });
  return res!.seq;
}

export async function audit(actor: string, action: string, detail: string) {
  const db = await getDb();
  await db.collection("audit_log").insertOne({
    id: await nextId(db, "audit_log"),
    actor,
    action,
    detail,
    created_at: now(),
  });
}
