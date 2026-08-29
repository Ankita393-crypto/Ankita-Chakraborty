import { notFound, redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { PrintButton } from "./print-button";

export const dynamic = "force-dynamic";

export default async function CertificatePage({ params }: { params: Promise<{ vid: string }> }) {
  const { vid } = await params;
  const user = await getSessionUser();
  if (!user) redirect("/login");

  const cert = getDb()
    .prepare(
      `SELECT c.verification_id, c.kind, c.name_on_cert, c.issued_at, c.user_id, co.title AS course_title
       FROM certificates c JOIN courses co ON co.id = c.course_id
       WHERE c.verification_id = ?`
    )
    .get(vid.toUpperCase()) as
    | { verification_id: string; kind: string; name_on_cert: string; issued_at: string; user_id: number; course_title: string }
    | undefined;
  if (!cert || (cert.user_id !== user.id && !user.is_admin)) notFound();

  const date = cert.issued_at.slice(0, 10);

  return (
    <div>
      <div className="print:hidden text-center mb-4">
        <PrintButton />
        <p className="mt-1 text-xs text-slate-500">“Save as PDF” in the print dialog downloads the certificate.</p>
      </div>
      <div className="mx-auto max-w-3xl bg-white border-8 border-double border-indigo-700 p-12 text-center print:border-4">
        <div className="text-3xl font-extrabold tracking-tight text-indigo-700">Learnzy</div>
        <div className="mt-1 text-xs uppercase tracking-widest text-slate-500">
          {cert.kind === "quiz" ? "Certificate of Entry Quiz Achievement" : "Certificate of Course Completion"}
        </div>
        <p className="mt-10 text-slate-600">This certifies that</p>
        <div className="mt-2 text-4xl font-bold font-serif">{cert.name_on_cert}</div>
        <p className="mt-6 text-slate-600">
          has {cert.kind === "quiz" ? "successfully passed the entry quiz for" : "successfully completed the course"}
        </p>
        <div className="mt-2 text-2xl font-semibold">{cert.course_title}</div>
        <p className="mt-8 text-sm text-slate-500">Issued on {date}</p>
        <div className="mt-10 flex justify-between items-end text-xs text-slate-500">
          <div>
            Verification ID: <span className="font-mono font-bold">{cert.verification_id}</span>
            <br />
            Verify at learnzy — /verify
          </div>
          <div className="text-right">
            Learnzy
            <br />
            AI-powered learning platform
          </div>
        </div>
      </div>
    </div>
  );
}
