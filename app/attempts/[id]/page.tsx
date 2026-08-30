import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { booksFor, amazonLink, flipkartLink } from "@/lib/book-links";

export const dynamic = "force-dynamic";

const OPTION_LABELS = ["A", "B", "C", "D", "E", "F"];

export default async function AnswerPaperPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getSessionUser();
  if (!user) redirect("/login");

  const db = getDb();
  const attempt = db
    .prepare("SELECT * FROM attempts WHERE id = ? AND submitted_at IS NOT NULL")
    .get(Number(id)) as
    | {
        id: number;
        user_id: number;
        course_id: number;
        question_ids: string;
        submitted_at: string;
        score: number;
        total: number;
        answers: string | null;
        marks: number | null;
      }
    | undefined;
  if (!attempt) notFound();
  if (attempt.user_id !== user.id && !user.is_admin) notFound();

  const course = db
    .prepare("SELECT id, title, category, marks_correct, marks_wrong FROM courses WHERE id = ?")
    .get(attempt.course_id) as {
    id: number;
    title: string;
    category: string;
    marks_correct: number | null;
    marks_wrong: number | null;
  };
  const isMock = course.category === "mock";
  const mc = course.marks_correct ?? 1;
  const mw = course.marks_wrong ?? 0;

  const ids = JSON.parse(attempt.question_ids) as number[];
  const answers = (attempt.answers ? JSON.parse(attempt.answers) : {}) as Record<string, number>;
  const questions = (
    db
      .prepare(
        `SELECT id, question, options, correct_index, subject, explanation FROM quiz_questions WHERE id IN (${ids
          .map(() => "?")
          .join(",")})`
      )
      .all(...ids) as {
      id: number;
      question: string;
      options: string;
      correct_index: number;
      subject: string | null;
      explanation: string | null;
    }[]
  )
    .sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id))
    .map((q) => ({ ...q, options: JSON.parse(q.options) as string[] }));

  // Subject-wise analysis for the weakness report.
  type Stat = { total: number; correct: number; wrong: number; unattempted: number };
  const bySubject = new Map<string, Stat>();
  let correct = 0;
  let wrong = 0;
  for (const q of questions) {
    const subject = q.subject ?? "General";
    const stat = bySubject.get(subject) ?? { total: 0, correct: 0, wrong: 0, unattempted: 0 };
    stat.total++;
    const chosen = answers[String(q.id)];
    if (chosen === undefined) stat.unattempted++;
    else if (chosen === q.correct_index) {
      stat.correct++;
      correct++;
    } else {
      stat.wrong++;
      wrong++;
    }
    bySubject.set(subject, stat);
  }
  const marks = attempt.marks ?? correct;
  const maxMarks = isMock ? Math.round(questions.length * mc * 100) / 100 : questions.length;

  // A subject is "weak" if accuracy on it is under 60% of its questions.
  const subjectRows = Array.from(bySubject.entries()).map(([subject, s]) => ({
    subject,
    ...s,
    accuracy: s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0,
    weak: s.correct < s.total * 0.6,
  }));
  subjectRows.sort((a, b) => a.accuracy - b.accuracy);
  const weakSubjects = subjectRows.filter((r) => r.weak);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Answer paper</div>
      <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold">{course.title}</h1>
      <p className="mt-1 text-sm text-slate-500">Submitted {attempt.submitted_at} (UTC)</p>

      {/* Score summary */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-2xl bg-white border border-slate-200 p-4 text-center">
          <div className="text-2xl font-extrabold text-indigo-700">
            {marks}
            <span className="text-sm font-semibold text-slate-400">/{maxMarks}</span>
          </div>
          <div className="text-xs text-slate-500 mt-1">{isMock ? "Marks (with negative marking)" : "Score"}</div>
        </div>
        <div className="rounded-2xl bg-white border border-slate-200 p-4 text-center">
          <div className="text-2xl font-extrabold text-emerald-600">{correct}</div>
          <div className="text-xs text-slate-500 mt-1">Correct (+{mc} each)</div>
        </div>
        <div className="rounded-2xl bg-white border border-slate-200 p-4 text-center">
          <div className="text-2xl font-extrabold text-rose-600">{wrong}</div>
          <div className="text-xs text-slate-500 mt-1">{isMock ? `Wrong (−${Math.round(mw * 100) / 100} each)` : "Wrong"}</div>
        </div>
        <div className="rounded-2xl bg-white border border-slate-200 p-4 text-center">
          <div className="text-2xl font-extrabold text-slate-500">{questions.length - correct - wrong}</div>
          <div className="text-xs text-slate-500 mt-1">Unattempted (0 each)</div>
        </div>
      </div>

      {/* Subject-wise weakness report */}
      <div className="mt-8 rounded-2xl bg-white border border-slate-200 p-6">
        <h2 className="font-bold text-lg">Subject-wise report — your preparation table</h2>
        <p className="mt-1 text-sm text-slate-600">
          Weak subjects (accuracy below 60%) are highlighted. Click any subject to open its study chapter in a new
          tab, then retake a mock to measure your improvement.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-500 border-b border-slate-200">
                <th className="py-2 pr-3">Subject</th>
                <th className="py-2 px-3 text-center">Questions</th>
                <th className="py-2 px-3 text-center">Correct</th>
                <th className="py-2 px-3 text-center">Wrong</th>
                <th className="py-2 px-3 text-center">Skipped</th>
                <th className="py-2 px-3 text-center">Accuracy</th>
                <th className="py-2 pl-3"></th>
              </tr>
            </thead>
            <tbody>
              {subjectRows.map((r) => (
                <tr key={r.subject} className={`border-b border-slate-100 ${r.weak ? "bg-rose-50/60" : ""}`}>
                  <td className="py-2.5 pr-3">
                    <a
                      href={`/learn/${encodeURIComponent(r.subject)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-indigo-700 hover:text-indigo-900 underline decoration-indigo-300"
                    >
                      {r.subject} ↗
                    </a>
                  </td>
                  <td className="py-2.5 px-3 text-center">{r.total}</td>
                  <td className="py-2.5 px-3 text-center text-emerald-700">{r.correct}</td>
                  <td className="py-2.5 px-3 text-center text-rose-700">{r.wrong}</td>
                  <td className="py-2.5 px-3 text-center text-slate-500">{r.unattempted}</td>
                  <td className="py-2.5 px-3 text-center font-bold">{r.accuracy}%</td>
                  <td className="py-2.5 pl-3 text-xs font-semibold">
                    {r.weak ? <span className="text-rose-600">Needs work</span> : <span className="text-emerald-600">On track</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {weakSubjects.length > 0 ? (
          <p className="mt-3 text-sm text-slate-600">
            <span className="font-semibold">Study plan suggestion:</span> focus on{" "}
            {weakSubjects.map((r) => r.subject).join(", ")} before your next attempt.
          </p>
        ) : (
          <p className="mt-3 text-sm text-emerald-700 font-semibold">
            Every subject is at 60% or above — you are on track across the paper.
          </p>
        )}
      </div>

      {/* Book recommendations for weak subjects (affiliate links) */}
      {weakSubjects.some((r) => booksFor(r.subject).length > 0) ? (
        <div className="mt-6 rounded-2xl bg-amber-50 border border-amber-200 p-6">
          <h2 className="font-bold text-lg text-amber-900">Recommended books for your weak subjects</h2>
          <p className="mt-1 text-sm text-amber-800">
            The standard books toppers use, for exactly the subjects you lost marks in. Buy on the store you prefer.
          </p>
          <div className="mt-4 space-y-4">
            {weakSubjects.map((r) => {
              const books = booksFor(r.subject);
              if (books.length === 0) return null;
              return (
                <div key={r.subject}>
                  <h3 className="text-sm font-bold text-slate-700">
                    {r.subject} <span className="font-normal text-slate-500">({r.accuracy}% accuracy)</span>
                  </h3>
                  <ul className="mt-2 space-y-2">
                    {books.map((b) => (
                      <li
                        key={b.title}
                        className="rounded-xl bg-white border border-slate-200 px-4 py-3 flex items-center justify-between gap-3 flex-wrap"
                      >
                        <div className="text-sm">
                          <span className="font-semibold">{b.title}</span>
                          <span className="text-slate-500"> — {b.author}</span>
                        </div>
                        <div className="flex gap-2">
                          <a
                            href={amazonLink(b)}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            className="rounded-lg bg-slate-900 text-white text-xs font-bold px-3 py-1.5 hover:bg-slate-700"
                          >
                            Amazon ↗
                          </a>
                          <a
                            href={flipkartLink(b)}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            className="rounded-lg bg-blue-600 text-white text-xs font-bold px-3 py-1.5 hover:bg-blue-700"
                          >
                            Flipkart ↗
                          </a>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-[11px] text-amber-700">
            Disclosure: these are links to third-party stores; Learnzy may earn an affiliate commission on purchases.
            Prices and availability are set by the store, not by us.
          </p>
        </div>
      ) : null}

      {/* Full solutions */}
      <h2 className="mt-10 font-bold text-lg">Solutions — every question explained</h2>
      <ol className="mt-4 space-y-4">
        {questions.map((q, qi) => {
          const chosen = answers[String(q.id)];
          const attempted = chosen !== undefined;
          const isCorrect = attempted && chosen === q.correct_index;
          return (
            <li key={q.id} className="rounded-2xl bg-white border border-slate-200 p-5">
              <div className="flex items-start justify-between gap-3">
                <p className="font-semibold">
                  {qi + 1}. {q.question}
                </p>
                <span
                  className={`shrink-0 text-xs font-bold rounded-full px-2.5 py-1 ${
                    !attempted
                      ? "bg-slate-100 text-slate-500"
                      : isCorrect
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-rose-100 text-rose-700"
                  }`}
                >
                  {!attempted ? "Skipped · 0" : isCorrect ? `Correct · +${mc}` : isMock ? `Wrong · −${Math.round(mw * 100) / 100}` : "Wrong"}
                </span>
              </div>
              {q.subject ? <div className="mt-1 text-xs text-slate-400">{q.subject}</div> : null}
              <div className="mt-3 space-y-1.5">
                {q.options.map((opt, oi) => (
                  <div
                    key={oi}
                    className={`rounded-lg border px-3 py-2 text-sm flex items-center gap-2 ${
                      oi === q.correct_index
                        ? "border-emerald-400 bg-emerald-50"
                        : attempted && oi === chosen
                          ? "border-rose-300 bg-rose-50"
                          : "border-slate-200"
                    }`}
                  >
                    <span className="font-bold text-xs text-slate-400">{OPTION_LABELS[oi]}.</span>
                    <span>{opt}</span>
                    {oi === q.correct_index ? (
                      <span className="ml-auto text-xs font-bold text-emerald-600">Correct answer</span>
                    ) : attempted && oi === chosen ? (
                      <span className="ml-auto text-xs font-bold text-rose-500">Your answer</span>
                    ) : null}
                  </div>
                ))}
              </div>
              {q.explanation ? (
                <p className="mt-3 text-sm text-slate-600 bg-slate-50 rounded-lg p-3">
                  <span className="font-semibold text-slate-700">Explanation: </span>
                  {q.explanation}
                </p>
              ) : null}
            </li>
          );
        })}
      </ol>

      <div className="mt-8 flex gap-3">
        <Link
          href={`/courses/${course.id}`}
          className="rounded-xl bg-indigo-600 text-white px-5 py-2.5 font-semibold hover:bg-indigo-700"
        >
          {isMock ? "Retake this mock" : "Back to course"}
        </Link>
        <Link href="/courses" className="rounded-xl border border-slate-300 px-5 py-2.5 font-semibold hover:bg-slate-100">
          All courses & mocks
        </Link>
      </div>
    </div>
  );
}
