"use client";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="rounded-xl border border-slate-300 px-5 py-2.5 font-semibold hover:border-indigo-400"
    >
      Print
    </button>
  );
}
