import crypto from "crypto";
import type { Db } from "mongodb";

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

export async function composePaper(db: Db, seriesId: number, paperNo: number): Promise<number[]> {
  const course = (await db
    .collection("courses")
    .findOne({ id: seriesId }, { projection: { paper_size: 1, subject_quota: 1 } })) as {
    paper_size: number | null;
    subject_quota: string | null;
  } | null;
  if (!course) return [];
  const paperSize = course.paper_size ?? 100;
  const quota = (course.subject_quota ? JSON.parse(course.subject_quota) : {}) as Record<string, number>;

  const bank = (await db
    .collection("quiz_questions")
    .find({ course_id: seriesId }, { projection: { id: 1, subject: 1 } })
    .toArray()) as unknown as { id: number; subject: string | null }[];

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
