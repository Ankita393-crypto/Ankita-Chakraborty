import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  const vid = (id ?? "").trim().toUpperCase();
  let cert:
    | { verification_id: string; kind: string; name_on_cert: string; issued_at: string; course_title: string }
    | undefined;
  if (vid) {
    const db = await getDb();
    const c = (await db.collection("certificates").findOne({ verification_id: vid })) as {
      verification_id: string;
      kind: string;
      name_on_cert: string;
      issued_at: string;
      course_id: number;
    } | null;
    if (c) {
      const course = (await db.collection("courses").findOne({ id: c.course_id })) as { title: string } | null;
      cert = {
        verification_id: c.verification_id,
        kind: c.kind,
        name_on_cert: c.name_on_cert,
        issued_at: c.issued_at,
        course_title: course?.title ?? "Unknown course",
      };
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-extrabold">Verify a certificate</h1>
      <p className="mt-1 text-sm text-slate-600">
        Employers and institutions can confirm any Bodhi certificate here using its verification ID.
      </p>
      <form className="mt-5 flex gap-2">
        <input
          name="id"
          defaultValue={vid}
          placeholder="e.g. 3F9A21C4D0"
          className="flex-1 rounded-lg border border-slate-300 px-3 py-2 font-mono"
        />
        <button className="rounded-lg bg-indigo-600 text-white px-5 py-2 font-semibold hover:bg-indigo-700">
          Verify
        </button>
      </form>

      {vid ? (
        cert ? (
          <div className="mt-6 rounded-2xl bg-emerald-50 border border-emerald-200 p-6">
            <div className="font-bold text-emerald-800">✓ Valid certificate</div>
            <dl className="mt-3 text-sm space-y-1">
              <div>
                <dt className="inline font-semibold">Name: </dt>
                <dd className="inline">{cert.name_on_cert}</dd>
              </div>
              <div>
                <dt className="inline font-semibold">Course: </dt>
                <dd className="inline">{cert.course_title}</dd>
              </div>
              <div>
                <dt className="inline font-semibold">Type: </dt>
                <dd className="inline">{cert.kind === "quiz" ? "Entrance exam pass" : "Course completion"}</dd>
              </div>
              <div>
                <dt className="inline font-semibold">Issued: </dt>
                <dd className="inline">{cert.issued_at.slice(0, 10)}</dd>
              </div>
            </dl>
          </div>
        ) : (
          <div className="mt-6 rounded-2xl bg-rose-50 border border-rose-200 p-6 text-rose-700 font-semibold">
            ✗ No certificate found with ID “{vid}”.
          </div>
        )
      ) : null}
    </div>
  );
}
