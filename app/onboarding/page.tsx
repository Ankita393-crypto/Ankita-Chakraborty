import { redirect } from "next/navigation";
import Link from "next/link";
import { getSessionUser } from "@/lib/auth";
import { OtpSection, IdUploadSection } from "./sections";

export const dynamic = "force-dynamic";

export default async function OnboardingPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");

  const phoneDone = Boolean(user.phone_verified);
  const idApproved = user.id_status === "approved";
  const idPending = user.id_status === "pending";

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-extrabold">Finish setting up your account</h1>
      <p className="mt-1 text-sm text-slate-600">
        Two steps are required before you can purchase an entry quiz: verify your phone and upload one identity
        document (PAN, Aadhaar, driving license, student ID, or employee ID).
      </p>

      <div className="mt-6 space-y-6">
        <section className="rounded-2xl bg-white border border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                phoneDone ? "bg-emerald-500" : "bg-slate-400"
              }`}
            >
              {phoneDone ? "✓" : "1"}
            </span>
            <h2 className="font-bold text-lg">Verify your phone ({user.phone})</h2>
          </div>
          {phoneDone ? (
            <p className="mt-2 text-sm text-emerald-700">Phone verified.</p>
          ) : (
            <OtpSection />
          )}
        </section>

        <section className="rounded-2xl bg-white border border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                idApproved ? "bg-emerald-500" : "bg-slate-400"
              }`}
            >
              {idApproved ? "✓" : "2"}
            </span>
            <h2 className="font-bold text-lg">Upload an identity document</h2>
          </div>
          {idApproved ? (
            <p className="mt-2 text-sm text-emerald-700">Your ID is approved. You&apos;re all set.</p>
          ) : idPending ? (
            <p className="mt-2 text-sm text-amber-700">
              Your document is uploaded and waiting for admin review. In the pilot, the owner approves it from the
              Admin page.
            </p>
          ) : (
            <>
              {user.id_status === "rejected" ? (
                <p className="mt-2 text-sm text-rose-600">
                  Your previous upload was rejected: {user.id_reject_reason}. Please upload again.
                </p>
              ) : null}
              <IdUploadSection />
            </>
          )}
        </section>
      </div>

      {phoneDone && idApproved ? (
        <div className="mt-6 text-center">
          <Link
            href="/courses"
            className="inline-block rounded-xl bg-indigo-600 text-white px-6 py-3 font-semibold hover:bg-indigo-700"
          >
            Browse courses →
          </Link>
        </div>
      ) : null}
    </div>
  );
}
