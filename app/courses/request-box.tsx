"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { requestCourse } from "@/app/actions";

export function RequestCourseBox({ label }: { label: string }) {
  const [state, action, pending] = useActionState(requestCourse, {});
  const router = useRouter();

  useEffect(() => {
    if (state?.slug) router.refresh();
  }, [state?.slug, router]);

  return (
    <form action={action} className="flex flex-col items-end gap-1">
      <div className="flex gap-2">
        <input
          name="topic"
          placeholder="e.g. History of the Cholas"
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm w-56"
          required
        />
        <button
          disabled={pending}
          className="rounded-lg bg-violet-600 text-white px-4 py-2 text-sm font-semibold hover:bg-violet-700 disabled:opacity-50"
        >
          {pending ? "Generating…" : label}
        </button>
      </div>
      {state?.error ? <p className="text-xs text-rose-600 max-w-xs text-right">{state.error}</p> : null}
      {state?.slug ? <p className="text-xs text-emerald-600">Course created — it now appears in the catalog below.</p> : null}
    </form>
  );
}
