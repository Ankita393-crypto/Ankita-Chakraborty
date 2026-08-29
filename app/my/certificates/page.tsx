import Link from "next/link";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function MyCertificatesPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");

  const certs = getDb()
    .prepare(
      `SELECT c.verification_id, c.kind, c.issued_at, co.title AS course_title
       FROM certificates c JOIN courses co ON co.id = c.course_id
       WHERE c.user_id = ? ORDER BY c.issued_at DESC`
    )
    .all(user.id) as { verification_id: string; kind: string; issued_at: string; course_title: string }[];

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-extrabold">My certificates</h1>
      {certs.length === 0 ? (
        <p className="mt-4 text-slate-600">
          No certificates yet. Pass an entry quiz to earn your first one —{" "}
          <Link href="/courses" className="text-indigo-600 underline">
            browse courses
          </Link>
          .
        </p>
      ) : (
        <ul className="mt-5 space-y-3">
          {certs.map((c) => (
            <li key={c.verification_id}>
              <Link
                href={`/certificate/${c.verification_id}`}
                className="flex items-center justify-between rounded-xl bg-white border border-slate-200 px-5 py-4 hover:border-indigo-300"
              >
                <div>
                  <div className="font-semibold">{c.course_title}</div>
                  <div className="text-sm text-slate-500">
                    {c.kind === "quiz" ? "Entry quiz certificate" : "Completion certificate"} ·{" "}
                    {c.issued_at.slice(0, 10)}
                  </div>
                </div>
                <span className="font-mono text-xs text-slate-400">{c.verification_id}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
