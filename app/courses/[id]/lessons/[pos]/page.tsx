import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { getLang, t } from "@/lib/i18n";
import { completeLesson } from "@/app/actions";
import { ReportBox } from "./report-box";

export const dynamic = "force-dynamic";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string; pos: string }>;
}) {
  const { id, pos } = await params;
  const courseId = Number(id);
  const position = Number(pos);
  const user = await getSessionUser();
  if (!user) redirect("/login");

  const db = getDb();
  const unlocked = db.prepare("SELECT 1 FROM unlocks WHERE user_id = ? AND course_id = ?").get(user.id, courseId);
  if (!unlocked) redirect(`/courses/${courseId}`);

  const lang = await getLang();
  const d = await t();

  // Prefer the lesson in the user's language; fall back to any available language.
  const lesson =
    (db
      .prepare("SELECT title, content, language FROM lessons WHERE course_id = ? AND position = ? AND language = ?")
      .get(courseId, position, lang) as { title: string; content: string; language: string } | undefined) ??
    (db
      .prepare("SELECT title, content, language FROM lessons WHERE course_id = ? AND position = ? ORDER BY language LIMIT 1")
      .get(courseId, position) as { title: string; content: string; language: string } | undefined);
  if (!lesson) notFound();

  const total = (
    db.prepare("SELECT COUNT(DISTINCT position) AS c FROM lessons WHERE course_id = ?").get(courseId) as { c: number }
  ).c;
  const isDone = Boolean(
    db.prepare("SELECT 1 FROM progress WHERE user_id = ? AND course_id = ? AND position = ?").get(user.id, courseId, position)
  );

  return (
    <article className="max-w-2xl mx-auto">
      <Link href={`/courses/${courseId}`} className="text-sm text-indigo-600">
        ← Back to course
      </Link>
      <h1 className="mt-2 text-2xl font-extrabold">
        {position}. {lesson.title}
      </h1>
      {lesson.language !== lang ? (
        <p className="mt-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-2">
          This lesson isn&apos;t available in your selected language yet, so it&apos;s shown in{" "}
          {lesson.language === "en" ? "English" : lesson.language === "hi" ? "Hindi" : "Bengali"}. Translations are
          generated when the owner activates the AI key.
        </p>
      ) : null}
      <p className="mt-2 text-xs text-slate-500 italic">{d.disclaimer}</p>

      <div className="mt-6 space-y-4 text-slate-800 leading-relaxed">
        {lesson.content.split(/\n\n+/).map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-3 flex-wrap">
        {isDone ? (
          <span className="rounded-xl bg-emerald-100 text-emerald-700 px-4 py-2 text-sm font-semibold">
            ✓ {d.completed}
          </span>
        ) : (
          <form action={completeLesson}>
            <input type="hidden" name="courseId" value={courseId} />
            <input type="hidden" name="position" value={position} />
            <button className="rounded-xl bg-indigo-600 text-white px-4 py-2 text-sm font-semibold hover:bg-indigo-700">
              {d.markComplete}
            </button>
          </form>
        )}
        {position < total ? (
          <Link
            href={`/courses/${courseId}/lessons/${position + 1}`}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold hover:border-indigo-400"
          >
            Next lesson →
          </Link>
        ) : null}
        <ReportBox courseId={courseId} position={position} label={d.reportError} />
      </div>
    </article>
  );
}
