"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { submitQuiz } from "@/app/actions";

type Q = { id: number; question: string; options: string[] };
type Result = {
  passed?: boolean;
  score?: number;
  total?: number;
  error?: string;
  mock?: boolean;
  marks?: number;
  maxMarks?: number;
  attemptId?: number;
};

export function QuizRunner({
  attemptId,
  courseId,
  courseTitle,
  questions,
  secondsLeft,
  isMock,
  marksCorrect,
  marksWrong,
}: {
  attemptId: number;
  courseId: number;
  courseTitle: string;
  questions: Q[];
  secondsLeft: number;
  isMock: boolean;
  marksCorrect: number;
  marksWrong: number;
}) {
  const [remaining, setRemaining] = useState(secondsLeft);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [review, setReview] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState<Result | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const submittedRef = useRef(false);

  async function doSubmit() {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setSubmitting(true);
    const res = await submitQuiz(attemptId, answers);
    setResult(res);
    setSubmitting(false);
  }

  useEffect(() => {
    if (result) return;
    const t = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(t);
          doSubmit();
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  if (result) {
    return (
      <div className="max-w-xl mx-auto rounded-2xl bg-white border border-slate-200 p-8 text-center">
        {result.error ? (
          <>
            <h1 className="text-xl font-bold text-rose-600">Something went wrong</h1>
            <p className="mt-2 text-sm text-slate-600">{result.error}</p>
          </>
        ) : result.mock ? (
          <>
            <div className="text-5xl">📊</div>
            <h1 className="mt-2 text-2xl font-extrabold text-slate-800">
              Your score: {result.marks} / {result.maxMarks}
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              {result.score} correct out of {result.total} questions, scored with real negative marking. Your full
              answer paper — with explanations for every question and a subject-wise weakness report — is ready.
            </p>
            <Link
              href={`/attempts/${result.attemptId}`}
              className="mt-5 inline-block rounded-xl bg-indigo-600 text-white px-5 py-2.5 font-semibold hover:bg-indigo-700"
            >
              Open your answer paper
            </Link>
          </>
        ) : result.passed ? (
          <>
            <div className="text-5xl">🎉</div>
            <h1 className="mt-2 text-2xl font-extrabold text-emerald-700">
              You passed — {result.score}/{result.total}
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              The course is now unlocked for you, free. Your entrance exam certificate is ready in “My certificates”.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-extrabold text-slate-800">
              Not this time — {result.score}/{result.total}
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              You need 60% to pass. You can retry by paying for a new attempt (same price — payments are final).
            </p>
          </>
        )}
        {!result.mock ? (
          <Link
            href={`/courses/${courseId}`}
            className="mt-5 inline-block rounded-xl bg-indigo-600 text-white px-5 py-2.5 font-semibold"
          >
            Back to course
          </Link>
        ) : null}
      </div>
    );
  }

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const hours = Math.floor(mins / 60);
  const answered = Object.keys(answers).length;

  return (
    <div className="max-w-5xl mx-auto lg:flex lg:gap-6">
      <div className="flex-1 max-w-2xl">
        <div className="sticky top-16 z-10 rounded-xl bg-white border border-slate-200 px-5 py-3 flex items-center justify-between shadow-sm">
          <h1 className="font-bold truncate pr-4 text-sm sm:text-base">
            {isMock ? "" : "Entrance exam: "}
            {courseTitle}
          </h1>
          <span
            className={`font-mono font-bold text-lg tabular-nums ${remaining < 300 ? "text-rose-600" : "text-slate-700"}`}
          >
            {hours > 0 ? `${hours}:${(mins % 60).toString().padStart(2, "0")}` : mins}:{secs.toString().padStart(2, "0")}
          </span>
        </div>
        <p className="mt-2 text-xs text-slate-500">
          {isMock
            ? `Real exam rules: +${marksCorrect} per correct answer, −${Math.round(marksWrong * 100) / 100} per wrong answer, unattempted questions score 0. Auto-submits at zero.`
            : "Time-bound, not proctored. The exam auto-submits when the timer reaches zero."}
        </p>

        <ol className="mt-5 space-y-5">
          {questions.map((q, qi) => (
            <li key={q.id} id={`question-${qi + 1}`} className="rounded-2xl bg-white border border-slate-200 p-5 scroll-mt-32">
              <div className="flex items-start justify-between gap-3">
                <p className="font-semibold">
                  {qi + 1}. {q.question}
                </p>
                <button
                  type="button"
                  onClick={() => setReview((r) => ({ ...r, [String(q.id)]: !r[String(q.id)] }))}
                  className={`shrink-0 text-xs rounded-full border px-2.5 py-1 font-medium ${
                    review[String(q.id)]
                      ? "border-violet-500 bg-violet-50 text-violet-700"
                      : "border-slate-300 text-slate-500 hover:border-violet-400"
                  }`}
                >
                  {review[String(q.id)] ? "★ Marked" : "☆ Mark for review"}
                </button>
              </div>
              <div className="mt-3 space-y-2">
                {q.options.map((opt, oi) => (
                  <label
                    key={oi}
                    className={`flex items-center gap-2 rounded-lg border px-3 py-2 cursor-pointer text-sm ${
                      answers[String(q.id)] === oi
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`q-${q.id}`}
                      checked={answers[String(q.id)] === oi}
                      onChange={() => setAnswers((a) => ({ ...a, [String(q.id)]: oi }))}
                    />
                    {opt}
                  </label>
                ))}
              </div>
              {answers[String(q.id)] !== undefined ? (
                <button
                  type="button"
                  onClick={() =>
                    setAnswers((a) => {
                      const next = { ...a };
                      delete next[String(q.id)];
                      return next;
                    })
                  }
                  className="mt-2 text-xs text-slate-400 hover:text-slate-600 underline"
                >
                  Clear answer (unattempted = no negative marking)
                </button>
              ) : null}
            </li>
          ))}
        </ol>

        <button
          onClick={doSubmit}
          disabled={submitting}
          className="mt-6 w-full rounded-xl bg-indigo-600 text-white py-3 font-bold hover:bg-indigo-700 disabled:opacity-50"
        >
          {submitting ? "Submitting…" : `Submit paper (${answered}/${questions.length} answered)`}
        </button>
      </div>

      {/* Question palette — like the real computer-based test */}
      <aside className="hidden lg:block w-56 shrink-0">
        <div className="sticky top-16 rounded-2xl bg-white border border-slate-200 p-4">
          <h2 className="text-xs font-bold text-slate-600 uppercase tracking-wide">Question palette</h2>
          <div className="mt-3 grid grid-cols-5 gap-1.5">
            {questions.map((q, qi) => {
              const a = answers[String(q.id)] !== undefined;
              const r = review[String(q.id)];
              return (
                <a
                  key={q.id}
                  href={`#question-${qi + 1}`}
                  className={`h-8 rounded flex items-center justify-center text-xs font-bold border ${
                    r
                      ? "bg-violet-500 text-white border-violet-500"
                      : a
                        ? "bg-emerald-500 text-white border-emerald-500"
                        : "bg-white text-slate-500 border-slate-300"
                  }`}
                >
                  {qi + 1}
                </a>
              );
            })}
          </div>
          <div className="mt-3 space-y-1 text-[11px] text-slate-500">
            <p><span className="inline-block w-3 h-3 rounded bg-emerald-500 align-middle mr-1.5" />Answered ({answered})</p>
            <p><span className="inline-block w-3 h-3 rounded bg-violet-500 align-middle mr-1.5" />Marked for review</p>
            <p><span className="inline-block w-3 h-3 rounded border border-slate-300 bg-white align-middle mr-1.5" />Not answered ({questions.length - answered})</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
