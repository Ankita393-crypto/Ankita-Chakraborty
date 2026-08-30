"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { submitQuiz } from "@/app/actions";

type Q = { id: number; question: string; options: string[] };
type Result = { passed?: boolean; score?: number; total?: number; error?: string };

export function QuizRunner({
  attemptId,
  courseId,
  courseTitle,
  questions,
  secondsLeft,
}: {
  attemptId: number;
  courseId: number;
  courseTitle: string;
  questions: Q[];
  secondsLeft: number;
}) {
  const [remaining, setRemaining] = useState(secondsLeft);
  const [answers, setAnswers] = useState<Record<string, number>>({});
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
        ) : result.passed ? (
          <>
            <div className="text-5xl">🎉</div>
            <h1 className="mt-2 text-2xl font-extrabold text-emerald-700">
              You passed — {result.score}/{result.total}
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              The course is now unlocked for you, free. Your quiz certificate is ready in “My certificates”.
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
        <Link
          href={`/courses/${courseId}`}
          className="mt-5 inline-block rounded-xl bg-indigo-600 text-white px-5 py-2.5 font-semibold"
        >
          Back to course
        </Link>
      </div>
    );
  }

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="sticky top-16 z-10 rounded-xl bg-white border border-slate-200 px-5 py-3 flex items-center justify-between shadow-sm">
        <h1 className="font-bold truncate pr-4">Entry quiz: {courseTitle}</h1>
        <span
          className={`font-mono font-bold text-lg tabular-nums ${remaining < 60 ? "text-rose-600" : "text-slate-700"}`}
        >
          {mins}:{secs.toString().padStart(2, "0")}
        </span>
      </div>
      <p className="mt-2 text-xs text-slate-500">
        Time-bound, not proctored. The quiz auto-submits when the timer reaches zero.
      </p>

      <ol className="mt-5 space-y-5">
        {questions.map((q, qi) => (
          <li key={q.id} className="rounded-2xl bg-white border border-slate-200 p-5">
            <p className="font-semibold">
              {qi + 1}. {q.question}
            </p>
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
          </li>
        ))}
      </ol>

      <button
        onClick={doSubmit}
        disabled={submitting}
        className="mt-6 w-full rounded-xl bg-indigo-600 text-white py-3 font-bold hover:bg-indigo-700 disabled:opacity-50"
      >
        {submitting ? "Submitting…" : "Submit answers"}
      </button>
    </div>
  );
}
