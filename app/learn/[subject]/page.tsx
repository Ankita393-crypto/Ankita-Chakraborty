import Link from "next/link";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { getLang } from "@/lib/i18n";
import { aiAvailable, generateSubjectNotes } from "@/lib/ai";
import { booksFor, amazonLink, flipkartLink } from "@/lib/book-links";

export const dynamic = "force-dynamic";

// Subjects with verified seeded courses on the platform — offered alongside
// (or instead of, when AI is off) the AI-generated chapter.
const RELATED_COURSE_SLUGS: Record<string, string[]> = {
  "Indian Polity": ["ssc-general-awareness"],
  "History & Culture": ["ssc-general-awareness"],
  Geography: ["ssc-general-awareness"],
  "Indian Economy": ["ssc-general-awareness"],
  "Environment & Ecology": ["ssc-general-awareness"],
  "Science & Technology": ["ssc-general-awareness"],
  "Quantitative Aptitude": ["quantitative-aptitude-govt-exams"],
  Reasoning: ["reasoning-govt-exams"],
  English: ["english-govt-exams"],
};

export default async function LearnSubjectPage({ params }: { params: Promise<{ subject: string }> }) {
  const { subject: raw } = await params;
  const subject = decodeURIComponent(raw).slice(0, 80);
  const user = await getSessionUser();
  if (!user) redirect("/login");

  const lang = await getLang();
  const db = await getDb();

  type Note = { title: string; content: string; source: string; created_at: string };
  // 1. Cached chapter?
  let note = (await db.collection("subject_notes").findOne({ subject, language: lang })) as Note | null;

  // 2. Generate on demand when AI is available — "the world is the knowledgebase".
  let generationError: string | null = null;
  if (!note && aiAvailable()) {
    try {
      const generated = await generateSubjectNotes(subject, lang);
      await db.collection("subject_notes").updateOne(
        { subject, language: lang },
        {
          $setOnInsert: {
            title: generated.title.slice(0, 200),
            content: generated.content,
            source: "ai",
            created_at: new Date().toISOString().replace("T", " ").slice(0, 19),
          },
        },
        { upsert: true }
      );
      note = (await db.collection("subject_notes").findOne({ subject, language: lang })) as Note | null;
    } catch (e) {
      generationError = e instanceof Error ? e.message : "Generation failed.";
    }
  }

  const relatedSlugs = RELATED_COURSE_SLUGS[subject] ?? [];
  const related =
    relatedSlugs.length > 0
      ? ((await db
          .collection("courses")
          .find({ published: 1, slug: { $in: relatedSlugs } }, { projection: { id: 1, title: 1 } })
          .toArray()) as unknown as { id: number; title: string }[])
      : [];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Study chapter</div>
      <h1 className="mt-1 text-3xl font-extrabold">{note ? note.title : subject}</h1>

      {note ? (
        <>
          <p className="mt-3 text-xs text-slate-500 italic">
            {note.source === "ai"
              ? "AI-generated study material — verify important facts independently before relying on them for the real exam. Found an error? Use “Report an error” on any course page and it will be reviewed."
              : "Curated study material."}
          </p>
          <article className="mt-6 space-y-4">
            {note.content.split(/\n\n+/).map((para, i) => (
              <p key={i} className="text-slate-700 leading-relaxed">
                {para}
              </p>
            ))}
          </article>
        </>
      ) : (
        <div className="mt-6 rounded-2xl bg-white border border-slate-200 p-6">
          {generationError ? (
            <>
              <h2 className="font-bold text-rose-600">Generation failed</h2>
              <p className="mt-2 text-sm text-slate-600">{generationError} — reload the page to try again.</p>
            </>
          ) : (
            <>
              <h2 className="font-bold text-lg">AI study chapters are not active yet</h2>
              <p className="mt-2 text-sm text-slate-600">
                In the live version, this page generates a complete coursebook-style chapter on{" "}
                <span className="font-semibold">{subject}</span> the moment you open it. The pilot does not yet have an
                AI provider key configured, so on-demand generation is switched off.
              </p>
            </>
          )}
        </div>
      )}

      {related.length > 0 ? (
        <div className="mt-8 rounded-2xl bg-indigo-50 border border-indigo-200 p-5">
          <h3 className="font-bold text-indigo-900">Verified Bodhi courses covering {subject}</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {related.map((c) => (
              <Link
                key={c.id}
                href={`/courses/${c.id}`}
                className="rounded-full border border-indigo-300 bg-white px-3 py-1 text-xs font-semibold text-indigo-700 hover:bg-indigo-100"
              >
                {c.title}
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      {booksFor(subject).length > 0 ? (
        <div className="mt-6 rounded-2xl bg-amber-50 border border-amber-200 p-5">
          <h3 className="font-bold text-amber-900">Prepare {subject} even better — the standard books</h3>
          <ul className="mt-2 space-y-2">
            {booksFor(subject).map((b) => (
              <li
                key={b.title}
                className="rounded-xl bg-white border border-slate-200 px-4 py-3 flex items-center justify-between gap-3 flex-wrap"
              >
                <div className="text-sm">
                  <span className="font-semibold">{b.title}</span>
                  <span className="text-slate-500"> — {b.author}</span>
                </div>
                <div className="flex gap-2">
                  <a
                    href={amazonLink(b)}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="rounded-lg bg-slate-900 text-white text-xs font-bold px-3 py-1.5 hover:bg-slate-700"
                  >
                    Amazon ↗
                  </a>
                  <a
                    href={flipkartLink(b)}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="rounded-lg bg-blue-600 text-white text-xs font-bold px-3 py-1.5 hover:bg-blue-700"
                  >
                    Flipkart ↗
                  </a>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[11px] text-amber-700">
            Disclosure: third-party store links; Bodhi may earn an affiliate commission. Prices are set by the store.
          </p>
        </div>
      ) : null}
    </div>
  );
}
