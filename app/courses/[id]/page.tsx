import Link from "next/link";
import { notFound } from "next/navigation";
import { getDb } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { t } from "@/lib/i18n";
import { payForQuiz } from "@/app/actions";

export const dynamic = "force-dynamic";

export default async function CoursePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { id } = await params;
  const { page } = await searchParams;
  const d = await t();
  const db = await getDb();
  const course = (await db.collection("courses").findOne({ id: Number(id), published: 1 })) as {
    id: number;
    title: string;
    description: string;
    category: string;
    tier: number;
    price_inr: number;
    exam_minutes: number | null;
    marks_correct: number | null;
    marks_wrong: number | null;
    paper_count: number | null;
    paper_size: number | null;
  } | null;
  if (!course) notFound();
  const isMock = course.category === "mock";

  const user = await getSessionUser();
  const isUnlocked = user
    ? Boolean(await db.collection("unlocks").findOne({ user_id: user.id, course_id: course.id }))
    : false;

  const lessonDocs = (await db
    .collection("lessons")
    .find({ course_id: course.id }, { projection: { position: 1, title: 1 } })
    .sort({ position: 1 })
    .toArray()) as unknown as { position: number; title: string }[];
  const seen = new Set<number>();
  const lessons = lessonDocs.filter((l) => (seen.has(l.position) ? false : (seen.add(l.position), true)));

  const doneSet = new Set<number>(
    user && isUnlocked
      ? (
          (await db
            .collection("progress")
            .find({ user_id: user.id, course_id: course.id }, { projection: { position: 1 } })
            .toArray()) as unknown as { position: number }[]
        ).map((r) => r.position)
      : []
  );

  const certs =
    user &&
    ((await db
      .collection("certificates")
      .find({ user_id: user.id, course_id: course.id }, { projection: { verification_id: 1, kind: 1 } })
      .toArray()) as unknown as { verification_id: string; kind: string }[]);

  const canPay = user && user.phone_verified && user.id_status === "approved";

  const questionCount = await db.collection("quiz_questions").countDocuments({ course_id: course.id });
  const myAttempts =
    isMock && user
      ? ((await db
          .collection("attempts")
          .find({ user_id: user.id, course_id: course.id, submitted_at: { $ne: null } })
          .sort({ id: -1 })
          .toArray()) as unknown as {
          id: number;
          submitted_at: string;
          score: number;
          total: number;
          marks: number | null;
          paper_no: number | null;
        }[])
      : [];

  if (isMock) {
    const paperCount = course.paper_count ?? 1;
    const paperSize = course.paper_size ?? questionCount;
    const maxMarks = Math.round(paperSize * (course.marks_correct ?? 1) * 100) / 100;
    const bestByPaper = new Map<number, number>();
    for (const a of myAttempts) {
      if (a.paper_no == null) continue;
      const m = a.marks ?? a.score;
      if (!bestByPaper.has(a.paper_no) || m > bestByPaper.get(a.paper_no)!) bestByPaper.set(a.paper_no, m);
    }

    const PAGE_SIZE = 100;
    const totalPages = Math.ceil(paperCount / PAGE_SIZE);
    const pageNo = Math.min(Math.max(Number(page) || 1, 1), totalPages);
    const firstPaper = (pageNo - 1) * PAGE_SIZE + 1;
    const lastPaper = Math.min(pageNo * PAGE_SIZE, paperCount);

    return (
      <div className="max-w-3xl mx-auto">
        <div className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
          Mock series · Real exam simulation
        </div>
        <h1 className="mt-1 text-3xl font-extrabold">{course.title}</h1>
        <p className="mt-2 text-slate-600">{course.description}</p>
        <p className="mt-3 text-xs text-slate-500 italic">
          Bodhi is not affiliated with UPSC. Papers reproduce the real pattern and static-syllabus subject mix; the
          real exam also carries current-affairs questions that change every year.
        </p>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-2xl bg-white border border-slate-200 p-4 text-center">
            <div className="text-xl font-extrabold text-slate-800">{paperCount}</div>
            <div className="text-xs text-slate-500 mt-1">Papers in the series</div>
          </div>
          <div className="rounded-2xl bg-white border border-slate-200 p-4 text-center">
            <div className="text-xl font-extrabold text-slate-800">
              {paperSize} q · {course.exam_minutes} min
            </div>
            <div className="text-xs text-slate-500 mt-1">Per paper (real pattern)</div>
          </div>
          <div className="rounded-2xl bg-white border border-slate-200 p-4 text-center">
            <div className="text-xl font-extrabold text-slate-800">
              +{course.marks_correct} / −{Math.round((course.marks_wrong ?? 0) * 100) / 100}
            </div>
            <div className="text-xs text-slate-500 mt-1">Marking (real rules)</div>
          </div>
          <div className="rounded-2xl bg-white border border-slate-200 p-4 text-center">
            <div className="text-xl font-extrabold text-slate-800">{questionCount}</div>
            <div className="text-xs text-slate-500 mt-1">Questions in the bank</div>
          </div>
        </div>

        {questionCount < paperSize * 3 ? (
          <p className="mt-3 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2">
            Honest note: papers are composed from a verified question bank that is still growing. While the bank is
            small, different paper numbers will share many questions. New verified questions are added continuously,
            and papers become more distinct automatically.
          </p>
        ) : null}

        {!isUnlocked ? (
          <div className="mt-6 rounded-2xl bg-white border border-indigo-200 p-6">
            <h2 className="font-bold text-lg">
              Unlock all {paperCount} papers — ₹{course.price_inr}, one-time
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              One payment opens the entire series: sit any paper, any number of times. Every paper is followed by a
              complete answer paper (every question explained) and a subject-wise weakness report with book
              recommendations. Payments are final — no refunds.
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
                  Buy the series — ₹{course.price_inr} one-time (Test Mode)
                </button>
                <p className="mt-2 text-xs text-slate-500">
                  Test mode: no real money moves in the pilot. Razorpay checkout replaces this button in the live
                  version.
                </p>
              </form>
            )}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl bg-white border border-slate-200 p-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="font-bold text-lg">
                Your papers <span className="text-sm font-semibold text-emerald-600">(series unlocked)</span>
              </h2>
              <span className="text-xs text-slate-500">
                Papers {firstPaper}–{lastPaper} of {paperCount}
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-600">
              Pick any paper number. Attempted papers show your best marks. Retakes are free and unlimited.
            </p>
            <div className="mt-4 grid grid-cols-5 sm:grid-cols-10 gap-1.5">
              {Array.from({ length: lastPaper - firstPaper + 1 }, (_, i) => firstPaper + i).map((n) => {
                const best = bestByPaper.get(n);
                return (
                  <Link
                    key={n}
                    href={`/courses/${course.id}/quiz?paper=${n}`}
                    className={`h-10 rounded flex flex-col items-center justify-center text-xs font-bold border leading-none gap-0.5 ${
                      best !== undefined
                        ? "bg-emerald-500 text-white border-emerald-500"
                        : "bg-white text-slate-600 border-slate-300 hover:border-indigo-400"
                    }`}
                    title={best !== undefined ? `Best: ${best}/${maxMarks}` : `Sit paper ${n}`}
                  >
                    <span>{n}</span>
                    {best !== undefined ? <span className="text-[9px] font-semibold">{best}</span> : null}
                  </Link>
                );
              })}
            </div>
            {totalPages > 1 ? (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={`/courses/${course.id}?page=${p}`}
                    className={`rounded px-2.5 py-1 text-xs font-semibold border ${
                      p === pageNo
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "border-slate-300 text-slate-600 hover:border-indigo-400"
                    }`}
                  >
                    {(p - 1) * PAGE_SIZE + 1}–{Math.min(p * PAGE_SIZE, paperCount)}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        )}

        {myAttempts.length > 0 ? (
          <div className="mt-6 rounded-2xl bg-white border border-slate-200 p-6">
            <h2 className="font-bold text-lg">Your recent attempts</h2>
            <ul className="mt-3 space-y-2">
              {myAttempts.slice(0, 10).map((a) => (
                <li key={a.id}>
                  <Link
                    href={`/attempts/${a.id}`}
                    className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 hover:border-indigo-300"
                  >
                    <span className="text-sm font-medium">
                      Paper {a.paper_no ?? "—"} · {a.submitted_at} (UTC)
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
          Bodhi prepares you for this external certification; the certification itself is awarded by its issuing
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
