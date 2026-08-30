"use client";

import { useActionState } from "react";
import Link from "next/link";
import { register } from "@/app/actions";

export default function RegisterPage() {
  const [state, action, pending] = useActionState(register, {});

  return (
    <div className="max-w-md mx-auto rounded-2xl bg-white border border-slate-200 p-8">
      <h1 className="text-2xl font-extrabold">Create your Learnzy account</h1>
      <p className="mt-1 text-sm text-slate-600">
        Email, phone, and an ID document are required before you can take a paid quiz.
      </p>
      <div className="mt-3 rounded-lg bg-slate-100 text-slate-600 text-xs p-3">
        Google sign-in will appear here once the owner adds Google OAuth credentials — for the pilot, use email
        registration.
      </div>
      <form action={action} className="mt-6 space-y-4">
        <label className="block">
          <span className="text-sm font-medium">Full name (as it will appear on certificates)</span>
          <input name="name" required className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Email</span>
          <input name="email" type="email" required className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Phone number</span>
          <input
            name="phone"
            type="tel"
            required
            placeholder="+91XXXXXXXXXX"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Password (8+ characters)</span>
          <input
            name="password"
            type="password"
            required
            minLength={8}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        {state?.error ? <p className="text-sm text-rose-600">{state.error}</p> : null}
        <button
          disabled={pending}
          className="w-full rounded-xl bg-indigo-600 text-white py-2.5 font-semibold hover:bg-indigo-700 disabled:opacity-50"
        >
          {pending ? "Creating account…" : "Sign up"}
        </button>
      </form>
      <p className="mt-4 text-sm text-slate-600">
        Already have an account?{" "}
        <Link href="/login" className="text-indigo-600 font-medium">
          Log in
        </Link>
      </p>
    </div>
  );
}
