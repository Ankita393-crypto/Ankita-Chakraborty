import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getDb, parseDbDate } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { startAttempt } from "@/app/actions";
import { QuizRunner } from "./runner";

export const dynamic = "force-dynamic";

export default async function QuizPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ paper?: string }>;
}) {
  const { id } = await params;
  const { paper } = await searchParams;
  const courseId = Number(id);
  const user = await getSessionUser();
  if (!user) redirect("/login");

  const db = await getDb();
  const course = (await db.collection("courses").findOne({ id: courseId, published: 1 })) as {
    id: number;
    title: string;
    category: string;
    marks_correct: number | null;
    marks_wrong: number | null;
    paper_count: number | null;
  } | null;
  if (!course) notFound();
  const isMock = course.category === "mock";

  let paperNo: number | undefined;
  if (isMock) {
    paperNo = Number(paper);
    if (!Number.isInteger(paperNo) || paperNo < 1 || paperNo > (course.paper_count ?? 1)) {
      redirect(`/courses/${courseId}`);
    }
  } else {
    const already = await db.collection("unlocks").findOne({ user_id: user.id, course_id: courseId });
    if (already) redirect(`/courses/${courseId}`);
  }

  const res = await startAttempt(courseId, paperNo);
  if (res.error === "no_payment") {
    return (
      <div className="max-w-xl mx-auto rounded-2xl bg-white border border-slate-200 p-8 text-center">
        <h1 className="text-xl font-bold">{isMock ? "Series not purchased yet" : "No exam attempt available"}</h1>
        <p className="mt-2 text-sm text-slate-600">
          {isMock
            ? "One payment unlocks every paper in this mock series. Buy the series first, then sit any paper."
            : "You need to pay for an entrance exam attempt first (payments are final; each attempt is paid separately)."}
        </p>
        <Link
          href={`/courses/${courseId}`}
          className="mt-4 inline-block rounded-xl bg-indigo-600 text-white px-5 py-2.5 font-semibold"
        >
          {isMock ? "Go to the series page" : "Back to course"}
        </Link>
      </div>
    );
  }
  if (!res.attemptId) redirect(`/courses/${courseId}`);

  const attempt = (await db
    .collection("attempts")
    .findOne({ id: res.attemptId }, { projection: { question_ids: 1, deadline: 1 } })) as {
    question_ids: string;
    deadline: string;
  } | null;
  if (!attempt) redirect(`/courses/${courseId}`);
  const ids = JSON.parse(attempt.question_ids) as number[];
  const questions = (
    (await db
      .collection("quiz_questions")
      .find({ id: { $in: ids } }, { projection: { id: 1, question: 1, options: 1 } })
      .toArray()) as unknown as { id: number; question: string; options: string }[]
  )
    .sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id))
    .map((q) => ({ id: q.id, question: q.question, options: JSON.parse(q.options) as string[] }));

  const secondsLeft = Math.max(0, Math.floor((parseDbDate(attempt.deadline) - Date.now()) / 1000));

  return (
    <QuizRunner
      attemptId={res.attemptId}
      courseId={courseId}
      courseTitle={isMock ? `${course.title} — Paper ${paperNo}` : course.title}
      questions={questions}
      secondsLeft={secondsLeft}
      isMock={isMock}
      marksCorrect={course.marks_correct ?? 1}
      marksWrong={course.marks_wrong ?? 0}
    />
  );
}
