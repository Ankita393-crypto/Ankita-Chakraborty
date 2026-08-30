import Link from "next/link";
import { t } from "@/lib/i18n";
import { getDb } from "@/lib/db";

export default async function Home() {
  const d = await t();
  const db = await getDb();
  const courses = (await db
    .collection("courses")
    .find({ published: 1 }, { projection: { id: 1, title: 1, description: 1, category: 1, price_inr: 1 } })
    .sort({ tier: 1 })
    .limit(4)
    .toArray()) as unknown as { id: number; title: string; description: string; category: string; price_inr: number }[];

  return (
    <div>
      <section className="text-center py-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
          {d.tagline}
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-slate-600">{d.heroSub}</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/courses"
            className="rounded-xl bg-indigo-600 text-white px-6 py-3 font-semibold hover:bg-indigo-700 shadow-sm"
          >
            {d.browseCourses}
          </Link>
          <Link
            href="/register"
            className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold hover:border-indigo-400"
          >
            {d.register}
          </Link>
        </div>
      </section>

      <section className="grid sm:grid-cols-2 gap-4 mt-8">
        {courses.map((c) => (
          <Link
            key={c.id}
            href={`/courses/${c.id}`}
            className="rounded-2xl bg-white border border-slate-200 p-5 hover:border-indigo-300 hover:shadow-md transition"
          >
            <div className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
              {c.category === "certprep" ? d.certPrep : d.generalSubjects}
            </div>
            <h3 className="mt-1 font-bold text-lg">{c.title}</h3>
            <p className="mt-1 text-sm text-slate-600 line-clamp-2">{c.description}</p>
            <div className="mt-3 text-sm font-semibold text-slate-700">Entrance exam ₹{c.price_inr} · Course free</div>
          </Link>
        ))}
      </section>

      <section className="mt-16 grid sm:grid-cols-3 gap-4 text-center">
        {[
          ["1", "Pass the entrance exam", "A timed exam of proper basic questions — like a scholarship admission test — proves you're serious about the subject."],
          ["2", "Learn free, endlessly", "The full course unlocks free — chapter-by-chapter lessons, videos, and downloadable notes."],
          ["3", "Earn certificates", "A certificate for the entrance exam, and a free one when you complete the course."],
        ].map(([n, title, sub]) => (
          <div key={n} className="rounded-2xl bg-white border border-slate-200 p-6">
            <div className="mx-auto w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center">
              {n}
            </div>
            <h4 className="mt-3 font-bold">{title}</h4>
            <p className="mt-1 text-sm text-slate-600">{sub}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
