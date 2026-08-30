import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { startAttempt } from "@/app/actions";
import { QuizRunner } from "./runner";

export const dynamic = "force-dynamic";

export default async function QuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const courseId = Number(id);
  const user = await getSessionUser();
  if (!user) redirect("/login");

  const db = getDb();
  const course = db.prepare("SELECT id, title FROM courses WHERE id = ? AND published = 1").get(courseId) as
    | { id: number; title: string }
    | undefined;
  if (!course) notFound();

  const already = db.prepare("SELECT 1 FROM unlocks WHERE user_id = ? AND course_id = ?").get(user.id, courseId);
  if (already) redirect(`/courses/${courseId}`);

  const res = await startAttempt(courseId);
  if (res.error === "no_payment") {
    return (
      <div className="max-w-xl mx-auto rounded-2xl bg-white border border-slate-200 p-8 text-center">
        <h1 className="text-xl font-bold">No exam attempt available</h1>
        <p className="mt-2 text-sm text-slate-600">
          You need to pay for an entrance exam attempt first (payments are final; each attempt is paid separately).
        </p>
        <Link
          href={`/courses/${courseId}`}
          className="mt-4 inline-block rounded-xl bg-indigo-600 text-white px-5 py-2.5 font-semibold"
        >
          Back to course
        </Link>
      </div>
    );
  }
  if (!res.attemptId) redirect(`/courses/${courseId}`);

  const attempt = db.prepare("SELECT question_ids, deadline FROM attempts WHERE id = ?").get(res.attemptId) as {
    question_ids: string;
    deadline: string;
  };
  const ids = JSON.parse(attempt.question_ids) as number[];
  const questions = (
    db
      .prepare(`SELECT id, question, options FROM quiz_questions WHERE id IN (${ids.map(() => "?").join(",")})`)
      .all(...ids) as { id: number; question: string; options: string }[]
  )
    .sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id))
    .map((q) => ({ id: q.id, question: q.question, options: JSON.parse(q.options) as string[] }));

  const secondsLeft = Math.max(
    0,
    Math.floor(
      ((db.prepare("SELECT (julianday(?) - julianday('now')) * 86400 AS s").get(attempt.deadline) as { s: number })
        .s ?? 0)
    )
  );

  return (
    <QuizRunner
      attemptId={res.attemptId}
      courseId={courseId}
      courseTitle={course.title}
      questions={questions}
      secondsLeft={secondsLeft}
    />
  );
}
