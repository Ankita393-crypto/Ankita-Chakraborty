"use client";

import { useActionState, useState } from "react";
import { reportError } from "@/app/actions";

export function ReportBox({ courseId, position, label }: { courseId: number; position: number; label: string }) {
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState(reportError, {});

  if (state?.ok) {
    return <span className="text-sm text-emerald-700">Thanks — your report is with our reviewers.</span>;
  }

  return (
    <div className="w-full">
      <button onClick={() => setOpen(!open)} className="text-sm text-slate-500 underline hover:text-rose-600">
        {label}
      </button>
      {open ? (
        <form action={action} className="mt-2 flex gap-2 items-start w-full">
          <input type="hidden" name="courseId" value={courseId} />
          <input type="hidden" name="position" value={position} />
          <textarea
            name="message"
            rows={2}
            placeholder="What looks wrong in this lesson?"
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
            required
          />
          <button
            disabled={pending}
            className="rounded-lg bg-rose-600 text-white px-4 py-2 text-sm font-semibold hover:bg-rose-700 disabled:opacity-50"
          >
            {pending ? "Sending…" : "Send"}
          </button>
        </form>
      ) : null}
      {state?.error ? <p className="mt-1 text-xs text-rose-600">{state.error}</p> : null}
    </div>
  );
}
