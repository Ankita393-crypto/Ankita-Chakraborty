import Link from "next/link";
import { getDb } from "@/lib/db";
import { EXAM_DIRECTORY } from "@/lib/exam-directory";

export const dynamic = "force-dynamic";

const LEVEL_LABELS: Record<string, string> = {
  central: "Central government",
  banking: "Banking",
  railways: "Railways",
  state: "State government",
};

export default function ExamsPage() {
  const db = getDb();
  const slugs = Array.from(new Set(EXAM_DIRECTORY.flatMap((e) => e.subjects)));
  const rows = db
    .prepare(
      `SELECT id, slug, title FROM courses WHERE published = 1 AND slug IN (${slugs.map(() => "?").join(",")})`
    )
    .all(...slugs) as { id: number; slug: string; title: string }[];
  const courseBySlug = new Map(rows.map((r) => [r.slug, r]));

  return (
    <div>
      <h1 className="text-3xl font-extrabold">Government exam directory</h1>
      <p className="mt-2 text-slate-600 max-w-3xl">
        India&apos;s major government recruitment exams, the bodies that conduct them, and their current patterns —
        cross-checked against official notifications. For each exam, the linked Learnzy courses cover the subjects it
        tests. Exam patterns can change between recruitment cycles, so always confirm details on the official website
        before applying.
      </p>

      <div className="mt-8 space-y-6">
        {EXAM_DIRECTORY.map((exam) => (
          <section key={exam.id} className="rounded-2xl bg-white border border-slate-200 p-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                  {LEVEL_LABELS[exam.level]}
                </span>
                <h2 className="mt-1 text-xl font-bold">{exam.name}</h2>
                <p className="text-sm text-slate-600">
                  Conducted by <span className="font-semibold">{exam.body}</span>
                </p>
              </div>
              <a
                href={exam.officialSite}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 whitespace-nowrap"
              >
                Official website ↗
              </a>
            </div>

            <dl className="mt-4 grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
              <div>
                <dt className="font-semibold text-slate-700">Eligibility</dt>
                <dd className="text-slate-600">{exam.eligibility}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-700">Selection stages</dt>
                <dd className="text-slate-600">{exam.stages}</dd>
              </div>
            </dl>

            <div className="mt-4">
              <h3 className="text-sm font-semibold text-slate-700">
                Exam pattern <span className="font-normal text-slate-400">(verified {exam.verifiedOn})</span>
              </h3>
              <ul className="mt-1 list-disc list-inside text-sm text-slate-600 space-y-0.5">
                {exam.pattern.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-semibold text-slate-700">Prepare on Learnzy</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {exam.subjects.map((slug) => {
                  const course = courseBySlug.get(slug);
                  if (!course) return null;
                  return (
                    <Link
                      key={slug}
                      href={`/courses/${course.id}`}
                      className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 hover:bg-indigo-100"
                    >
                      {course.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        ))}
      </div>

      <p className="mt-8 text-xs text-slate-400 max-w-3xl">
        Learnzy is a preparation platform and is not affiliated with UPSC, SSC, IBPS, SBI, the Railway Recruitment
        Boards, or any state Public Service Commission. Recruitment notifications, dates, fees, and patterns are
        published only on the official websites linked above.
      </p>
    </div>
  );
}
