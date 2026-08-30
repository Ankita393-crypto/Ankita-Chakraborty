import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { getSessionUser } from "@/lib/auth";
import { getLang, t } from "@/lib/i18n";
import { setLanguage, logout } from "@/app/actions";

export const metadata: Metadata = {
  title: "Bodhi — Learn anything, prove it, for free",
  description:
    "AI-powered lessons on every subject. Pass an entrance exam to unlock any course free and earn downloadable certificates.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();
  const lang = await getLang();
  const d = await t();

  return (
    <html lang={lang}>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <div className="bg-amber-100 text-amber-900 text-center text-xs py-1.5 px-4">
          Pilot session — payments are in test mode (no real money moves) and OTP codes appear on screen.
        </div>
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <nav className="mx-auto max-w-5xl flex items-center gap-4 px-4 py-3">
            <Link href="/" className="text-xl font-extrabold tracking-tight text-indigo-700">
              Bodhi
            </Link>
            <Link href="/courses" className="text-sm font-medium text-slate-600 hover:text-indigo-700">
              {d.courses}
            </Link>
            <Link href="/exams" className="text-sm font-medium text-slate-600 hover:text-indigo-700">
              {d.govExams}
            </Link>
            <Link href="/verify" className="text-sm font-medium text-slate-600 hover:text-indigo-700">
              {d.verifyCert}
            </Link>
            <div className="ml-auto flex items-center gap-3">
              <form action={setLanguage} className="flex items-center gap-1">
                {(["en", "hi", "bn"] as const).map((l) => (
                  <button
                    key={l}
                    name="lang"
                    value={l}
                    className={`text-xs rounded px-2 py-1 border ${
                      lang === l
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "border-slate-300 text-slate-600 hover:border-indigo-400"
                    }`}
                  >
                    {l === "en" ? "EN" : l === "hi" ? "हिं" : "বাং"}
                  </button>
                ))}
              </form>
              {user ? (
                <>
                  <Link href="/my/certificates" className="text-sm font-medium text-slate-600 hover:text-indigo-700">
                    {d.myCertificates}
                  </Link>
                  {user.is_admin ? (
                    <Link href="/admin" className="text-sm font-medium text-rose-600 hover:text-rose-800">
                      {d.admin}
                    </Link>
                  ) : null}
                  <form action={logout}>
                    <button className="text-sm rounded-lg border border-slate-300 px-3 py-1.5 hover:bg-slate-100">
                      {d.logout}
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-indigo-700">
                    {d.login}
                  </Link>
                  <Link
                    href="/register"
                    className="text-sm rounded-lg bg-indigo-600 text-white px-3 py-1.5 font-medium hover:bg-indigo-700"
                  >
                    {d.register}
                  </Link>
                </>
              )}
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        <footer className="mx-auto max-w-5xl px-4 py-8 text-xs text-slate-400 border-t border-slate-200 mt-12">
          Bodhi pilot · AI-generated content — verify independently before professional or medical use · Bodhi
          prepares you for external certifications; it does not award them.
        </footer>
      </body>
    </html>
  );
}
