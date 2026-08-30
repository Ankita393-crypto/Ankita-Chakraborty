import crypto from "crypto";
import type { Database } from "better-sqlite3";

// Paper composition — the "permutation and combination" engine.
//
// Every paper number of a mock series is composed deterministically from the
// series' question bank: paper #37 is the same paper for every learner (so
// scores are comparable and papers can be discussed), but different paper
// numbers select and order questions differently. Composition respects the
// real exam's per-subject quota (e.g. 18 Polity questions per GS paper).
//
// The bank grows over time (hand-written + AI-generated); as it grows, the
// overlap between papers falls automatically, with no re-engineering.

function paperHash(seriesId: number, paperNo: number, questionId: number): Buffer {
  return crypto.createHash("sha256").update(`${seriesId}:${paperNo}:${questionId}`).digest();
}

export function composePaper(db: Database, seriesId: number, paperNo: number): number[] {
  const course = db
    .prepare("SELECT paper_size, subject_quota FROM courses WHERE id = ?")
    .get(seriesId) as { paper_size: number | null; subject_quota: string | null };
  const paperSize = course.paper_size ?? 100;
  const quota = (course.subject_quota ? JSON.parse(course.subject_quota) : {}) as Record<string, number>;

  const bank = db
    .prepare("SELECT id, subject FROM quiz_questions WHERE course_id = ?")
    .all(seriesId) as { id: number; subject: string | null }[];

  const bySubject = new Map<string, number[]>();
  for (const q of bank) {
    const s = q.subject ?? "General";
    if (!bySubject.has(s)) bySubject.set(s, []);
    bySubject.get(s)!.push(q.id);
  }

  // Deterministic per-paper ordering within each subject.
  const sortForPaper = (ids: number[]) =>
    ids
      .map((id) => ({ id, h: paperHash(seriesId, paperNo, id) }))
      .sort((a, b) => a.h.compare(b.h))
      .map((x) => x.id);

  const chosen: number[] = [];
  const subjects = Object.keys(quota).length > 0 ? Object.keys(quota) : Array.from(bySubject.keys());
  for (const subject of subjects) {
    const available = sortForPaper(bySubject.get(subject) ?? []);
    const want = quota[subject] ?? Math.ceil(paperSize / subjects.length);
    chosen.push(...available.slice(0, Math.min(want, available.length)));
  }

  // If quotas could not be fully met (bank still growing), top up from the
  // remaining bank so the paper is as full as possible, capped at paper_size.
  if (chosen.length < paperSize) {
    const used = new Set(chosen);
    const rest = sortForPaper(bank.map((q) => q.id).filter((id) => !used.has(id)));
    chosen.push(...rest.slice(0, paperSize - chosen.length));
  }

  // Final question order is also paper-specific (a fresh permutation).
  return sortForPaper(chosen.slice(0, paperSize));
}

// How distinct papers currently are: with a bank of B questions and papers of
// size S, papers share questions when B is small. Shown honestly in the UI.
export function bankStats(db: Database, seriesId: number): { bankSize: number; paperSize: number } {
  const bankSize = (db.prepare("SELECT COUNT(*) AS c FROM quiz_questions WHERE course_id = ?").get(seriesId) as { c: number }).c;
  const course = db.prepare("SELECT paper_size FROM courses WHERE id = ?").get(seriesId) as { paper_size: number | null };
  return { bankSize, paperSize: course.paper_size ?? 100 };
}
