"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login } from "@/app/actions";

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, {});

  return (
    <div className="max-w-md mx-auto rounded-2xl bg-white border border-slate-200 p-8">
      <h1 className="text-2xl font-extrabold">Log in to Bodhi</h1>
      <form action={action} className="mt-6 space-y-4">
        <label className="block">
          <span className="text-sm font-medium">Email</span>
          <input name="email" type="email" required className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Password</span>
          <input name="password" type="password" required className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
        </label>
        {state?.error ? <p className="text-sm text-rose-600">{state.error}</p> : null}
        <button
          disabled={pending}
          className="w-full rounded-xl bg-indigo-600 text-white py-2.5 font-semibold hover:bg-indigo-700 disabled:opacity-50"
        >
          {pending ? "Logging in…" : "Log in"}
        </button>
      </form>
      <p className="mt-4 text-sm text-slate-600">
        New here?{" "}
        <Link href="/register" className="text-indigo-600 font-medium">
          Create an account
        </Link>
      </p>
    </div>
  );
}
