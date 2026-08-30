import Link from "next/link";
import { getDb } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { t } from "@/lib/i18n";
import { RequestCourseBox } from "./request-box";

export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  const d = await t();
  const user = await getSessionUser();
  const db = await getDb();
  const courses = (await db
    .collection("courses")
    .find({ published: 1 })
    .sort({ category: 1, tier: 1 })
    .toArray()) as unknown as {
    id: number;
    title: string;
    description: string;
    category: string;
    tier: number;
    price_inr: number;
    paper_count: number | null;
  }[];

  const unlocked = new Set<number>(
    user
      ? (
          (await db
            .collection("unlocks")
            .find({ user_id: user.id }, { projection: { course_id: 1 } })
            .toArray()) as unknown as { course_id: number }[]
        ).map((r) => r.course_id)
      : []
  );

  const groups: [string, typeof courses][] = [
    [d.mockExams, courses.filter((c) => c.category === "mock")],
    [d.generalSubjects, courses.filter((c) => c.category === "general")],
    [d.certPrep, courses.filter((c) => c.category === "certprep")],
  ];

  return (
    <div>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <h1 className="text-3xl font-extrabold">{d.courses}</h1>
        {user ? <RequestCourseBox label={d.requestCourse} /> : null}
      </div>

      {groups.map(([label, list]) => (
        <section key={label} className="mt-8">
          <h2 className="text-lg font-bold text-slate-700">{label}</h2>
          <div className="mt-3 grid sm:grid-cols-2 gap-4">
            {list.map((c) => (
              <Link
                key={c.id}
                href={`/courses/${c.id}`}
                className="rounded-2xl bg-white border border-slate-200 p-5 hover:border-indigo-300 hover:shadow-md transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">
                    {c.category === "mock" ? "Full mock" : `Tier ${c.tier}`}
                  </span>
                  {c.category === "mock" ? (
                    <span className="text-xs font-medium text-slate-500">Answer paper included</span>
                  ) : unlocked.has(c.id) ? (
                    <span className="text-xs font-bold text-emerald-600">{d.unlocked}</span>
                  ) : (
                    <span className="text-xs font-medium text-slate-500">{d.quizRequired}</span>
                  )}
                </div>
                <h3 className="mt-1 font-bold text-lg">{c.title}</h3>
                <p className="mt-1 text-sm text-slate-600 line-clamp-2">{c.description}</p>
                <div className="mt-3 text-sm font-semibold text-slate-700">
                  {c.category === "mock"
                    ? `₹${c.price_inr} one-time · ${c.paper_count ?? 1} papers · Answer papers & weakness reports`
                    : `Entrance exam ₹${c.price_inr} · Course free`}
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
