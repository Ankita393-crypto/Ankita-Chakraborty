import Link from "next/link";
import { notFound } from "next/navigation";
import { getDb } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { t } from "@/lib/i18n";
import { payForQuiz } from "@/app/actions";

export const dynamic = "force-dynamic";

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const d = await t();
  const db = getDb();
  const course = db
    .prepare("SELECT * FROM courses WHERE id = ? AND published = 1")
    .get(Number(id)) as
    | {
        id: number;
        title: string;
        description: string;
        category: string;
        tier: number;
        price_inr: number;
        exam_minutes: number | null;
        marks_correct: number | null;
        marks_wrong: number | null;
      }
    | undefined;
  if (!course) notFound();
  const isMock = course.category === "mock";

  const user = await getSessionUser();
  const isUnlocked = user
    ? Boolean(db.prepare("SELECT 1 FROM unlocks WHERE user_id = ? AND course_id = ?").get(user.id, course.id))
    : false;

  const lessons = db
    .prepare(
      "SELECT DISTINCT position, title FROM lessons WHERE course_id = ? ORDER BY position"
    )
    .all(course.id) as { position: number; title: string }[];

  const doneSet = new Set<number>(
    user && isUnlocked
      ? (
          db.prepare("SELECT position FROM progress WHERE user_id = ? AND course_id = ?").all(user.id, course.id) as {
            position: number;
          }[]
        ).map((r) => r.position)
      : []
  );

  const certs =
    user &&
    (db
      .prepare("SELECT verification_id, kind FROM certificates WHERE user_id = ? AND course_id = ?")
      .all(user.id, course.id) as { verification_id: string; kind: string }[]);

  const canPay = user && user.phone_verified && user.id_status === "approved";

  const questionCount = (
    db.prepare("SELECT COUNT(*) AS c FROM quiz_questions WHERE course_id = ?").get(course.id) as { c: number }
  ).c;
  const myAttempts = isMock && user
    ? (db
        .prepare(
          "SELECT id, submitted_at, score, total, marks FROM attempts WHERE user_id = ? AND course_id = ? AND submitted_at IS NOT NULL ORDER BY id DESC"
        )
        .all(user.id, course.id) as { id: number; submitted_at: string; score: number; total: number; marks: number | null }[])
    : [];

  if (isMock) {
    const maxMarks = Math.round(questionCount * (course.marks_correct ?? 1) * 100) / 100;
    return (
      <div className="max-w-3xl mx-auto">
        <div className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Mock exam · Real exam simulation</div>
        <h1 className="mt-1 text-3xl font-extrabold">{course.title}</h1>
        <p className="mt-2 text-slate-600">{course.description}</p>
        <p className="mt-3 text-xs text-slate-500 italic">
          Learnzy is not affiliated with UPSC. This is a practice simulation; the static-syllabus subject mix is
          reproduced faithfully, while the real paper also includes current-affairs questions that change every year.
        </p>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-2xl bg-white border border-slate-200 p-4 text-center">
            <div className="text-xl font-extrabold text-slate-800">{questionCount}</div>
            <div className="text-xs text-slate-500 mt-1">Questions</div>
          </div>
          <div className="rounded-2xl bg-white border border-slate-200 p-4 text-center">
            <div className="text-xl font-extrabold text-slate-800">{course.exam_minutes} min</div>
            <div className="text-xs text-slate-500 mt-1">Duration</div>
          </div>
          <div className="rounded-2xl bg-white border border-slate-200 p-4 text-center">
            <div className="text-xl font-extrabold text-slate-800">{maxMarks}</div>
            <div className="text-xs text-slate-500 mt-1">Maximum marks</div>
          </div>
          <div className="rounded-2xl bg-white border border-slate-200 p-4 text-center">
            <div className="text-xl font-extrabold text-slate-800">
              +{course.marks_correct} / −{Math.round((course.marks_wrong ?? 0) * 100) / 100}
            </div>
            <div className="text-xs text-slate-500 mt-1">Marking (real rules)</div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-white border border-slate-200 p-6">
          <h2 className="font-bold text-lg">Sit this mock</h2>
          <p className="mt-1 text-sm text-slate-600">
            Exactly like the real exam hall: one continuous timer, a question palette, and negative marking. After
            submission you get the complete answer paper — every question explained — plus a subject-wise weakness
            report with study links. Payments are final; each attempt is paid separately.
          </p>
          {!user ? (
            <Link
              href="/login"
              className="mt-4 inline-block rounded-xl bg-indigo-600 text-white px-5 py-2.5 font-semibold hover:bg-indigo-700"
            >
              Log in to continue
            </Link>
          ) : !canPay ? (
            <div className="mt-4">
              <p className="text-sm text-amber-700">Before paying, you need a verified phone and an approved ID document.</p>
              <Link
                href="/onboarding"
                className="mt-2 inline-block rounded-xl bg-amber-500 text-white px-5 py-2.5 font-semibold hover:bg-amber-600"
              >
                Complete account setup
              </Link>
            </div>
          ) : (
            <form action={payForQuiz} className="mt-4">
              <input type="hidden" name="courseId" value={course.id} />
              <button className="rounded-xl bg-indigo-600 text-white px-5 py-2.5 font-semibold hover:bg-indigo-700">
                Start mock — ₹{course.price_inr} (Test Mode)
              </button>
              <p className="mt-2 text-xs text-slate-500">
                Test mode: no real money moves in the pilot. Razorpay checkout replaces this button in the live version.
              </p>
            </form>
          )}
        </div>

        {myAttempts.length > 0 ? (
          <div className="mt-6 rounded-2xl bg-white border border-slate-200 p-6">
            <h2 className="font-bold text-lg">Your attempts</h2>
            <ul className="mt-3 space-y-2">
              {myAttempts.map((a, i) => (
                <li key={a.id}>
                  <Link
                    href={`/attempts/${a.id}`}
                    className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 hover:border-indigo-300"
                  >
                    <span className="text-sm font-medium">
                      Attempt {myAttempts.length - i} · {a.submitted_at} (UTC)
                    </span>
                    <span className="text-sm font-bold text-indigo-700">
                      {a.marks ?? a.score}/{maxMarks} → answer paper
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
        {course.category === "certprep" ? d.certPrep : d.generalSubjects} · Tier {course.tier}
      </div>
      <h1 className="mt-1 text-3xl font-extrabold">{course.title}</h1>
      <p className="mt-2 text-slate-600">{course.description}</p>
      <p className="mt-3 text-xs text-slate-500 italic">{d.disclaimer}</p>
      {course.category === "certprep" ? (
        <p className="mt-1 text-xs text-slate-500">
          Learnzy prepares you for this external certification; the certification itself is awarded by its issuing
          body.
        </p>
      ) : null}

      {!isUnlocked ? (
        <div className="mt-8 rounded-2xl bg-white border border-slate-200 p-6">
          <h2 className="font-bold text-lg">Unlock this course — entrance exam</h2>
          <p className="mt-1 text-sm text-slate-600">
            Like a scholarship admission test: pass the entrance exam to unlock all chapters free. The exam has 15
            basic-knowledge questions in 20 minutes (60% to pass), drawn from a larger question bank, time-bound but
            not proctored. Payments are final — no refunds. A failed attempt can be retried at the same price.
          </p>
          {!user ? (
            <Link
              href="/login"
              className="mt-4 inline-block rounded-xl bg-indigo-600 text-white px-5 py-2.5 font-semibold hover:bg-indigo-700"
            >
              Log in to continue
            </Link>
          ) : !canPay ? (
            <div className="mt-4">
              <p className="text-sm text-amber-700">
                Before paying, you need a verified phone and an approved ID document.
              </p>
              <Link
                href="/onboarding"
                className="mt-2 inline-block rounded-xl bg-amber-500 text-white px-5 py-2.5 font-semibold hover:bg-amber-600"
              >
                Complete account setup
              </Link>
            </div>
          ) : (
            <form action={payForQuiz} className="mt-4">
              <input type="hidden" name="courseId" value={course.id} />
              <button className="rounded-xl bg-indigo-600 text-white px-5 py-2.5 font-semibold hover:bg-indigo-700">
                {d.startQuiz} — ₹{course.price_inr} (Test Mode)
              </button>
              <p className="mt-2 text-xs text-slate-500">
                Test mode: no real money moves in the pilot. Razorpay checkout replaces this button in the live
                version.
              </p>
            </form>
          )}
        </div>
      ) : (
        <div className="mt-8">
          <h2 className="font-bold text-lg">
            {d.lessons} ({doneSet.size}/{lessons.length} {d.completed.toLowerCase()})
          </h2>
          <ol className="mt-3 space-y-2">
            {lessons.map((l) => (
              <li key={l.position}>
                <Link
                  href={`/courses/${course.id}/lessons/${l.position}`}
                  className="flex items-center gap-3 rounded-xl bg-white border border-slate-200 px-4 py-3 hover:border-indigo-300"
                >
                  <span
                    className={`w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center ${
                      doneSet.has(l.position) ? "bg-emerald-500" : "bg-slate-300"
                    }`}
                  >
                    {doneSet.has(l.position) ? "✓" : l.position}
                  </span>
                  <span className="font-medium">{l.title}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      )}

      {certs && certs.length > 0 ? (
        <div className="mt-8 rounded-2xl bg-emerald-50 border border-emerald-200 p-5">
          <h3 className="font-bold text-emerald-800">Your certificates for this course</h3>
          <ul className="mt-2 space-y-1">
            {certs.map((c) => (
              <li key={c.verification_id}>
                <Link href={`/certificate/${c.verification_id}`} className="text-sm text-emerald-700 underline">
                  {c.kind === "quiz" ? "Entrance exam certificate" : "Course completion certificate"} (
                  {c.verification_id})
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
