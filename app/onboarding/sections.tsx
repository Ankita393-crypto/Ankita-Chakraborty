"use client";

import { useActionState, useState } from "react";
import { sendOtp, verifyOtp, uploadId } from "@/app/actions";

export function OtpSection() {
  const [pilotCode, setPilotCode] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [state, action, pending] = useActionState(verifyOtp, {});

  return (
    <div className="mt-3">
      <button
        onClick={async () => {
          setSending(true);
          const res = await sendOtp();
          setPilotCode(res.code ?? null);
          setSending(false);
        }}
        disabled={sending}
        className="rounded-lg border border-indigo-300 text-indigo-700 px-4 py-2 text-sm font-medium hover:bg-indigo-50 disabled:opacity-50"
      >
        {sending ? "Sending…" : pilotCode ? "Send a new code" : "Send verification code"}
      </button>
      {pilotCode ? (
        <div className="mt-3 rounded-lg bg-amber-50 border border-amber-200 p-3 text-sm">
          <span className="font-semibold">Pilot mode:</span> your code is{" "}
          <span className="font-mono font-bold text-lg">{pilotCode}</span>. In the live version this arrives by SMS
          instead of appearing here.
        </div>
      ) : null}
      <form action={action} className="mt-3 flex gap-2">
        <input
          name="code"
          placeholder="6-digit code"
          className="rounded-lg border border-slate-300 px-3 py-2 w-40"
          required
        />
        <button
          disabled={pending}
          className="rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50"
        >
          Verify
        </button>
      </form>
      {state?.error ? <p className="mt-2 text-sm text-rose-600">{state.error}</p> : null}
    </div>
  );
}

export function IdUploadSection() {
  const [state, action, pending] = useActionState(uploadId, {});

  return (
    <form action={action} className="mt-3">
      <p className="text-sm text-slate-600">
        JPG, PNG, or PDF, up to 5 MB. Any one of: PAN, Aadhaar, driving license, student ID, employee ID.
      </p>
      <input name="idfile" type="file" accept=".jpg,.jpeg,.png,.pdf" required className="mt-2 block text-sm" />
      {state?.error ? <p className="mt-2 text-sm text-rose-600">{state.error}</p> : null}
      <button
        disabled={pending}
        className="mt-3 rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50"
      >
        {pending ? "Uploading…" : "Upload document"}
      </button>
    </form>
  );
}
