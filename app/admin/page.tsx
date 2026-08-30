import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { reviewId, resolveReport, togglePublish } from "@/app/actions";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await getSessionUser();
  if (!user || !user.is_admin) redirect("/login");

  const db = getDb();
  const pendingIds = db
    .prepare("SELECT id, name, email, phone, id_filename FROM users WHERE id_status = 'pending' ORDER BY id")
    .all() as { id: number; name: string; email: string; phone: string; id_filename: string }[];

  const reports = db
    .prepare(
      `SELECT r.id, r.position, r.message, r.status, r.created_at, co.title AS course_title, u.email AS reporter
       FROM reports r JOIN courses co ON co.id = r.course_id JOIN users u ON u.id = r.user_id
       WHERE r.status = 'open' ORDER BY r.id DESC`
    )
    .all() as { id: number; position: number; message: string; status: string; created_at: string; course_title: string; reporter: string }[];

  const courses = db
    .prepare("SELECT id, title, published, created_by, price_inr FROM courses ORDER BY id DESC")
    .all() as { id: number; title: string; published: number; created_by: string; price_inr: number }[];

  const log = db
    .prepare("SELECT actor, action, detail, created_at FROM audit_log ORDER BY id DESC LIMIT 25")
    .all() as { actor: string; action: string; detail: string; created_at: string }[];

  const stats = {
    users: (db.prepare("SELECT COUNT(*) AS c FROM users").get() as { c: number }).c,
    payments: (db.prepare("SELECT COUNT(*) AS c, COALESCE(SUM(amount_inr),0) AS s FROM payments").get() as { c: number; s: number }),
    certs: (db.prepare("SELECT COUNT(*) AS c FROM certificates").get() as { c: number }).c,
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-extrabold">Admin</h1>
        <div className="mt-3 grid grid-cols-3 gap-3 max-w-lg">
          <Stat label="Users" value={String(stats.users)} />
          <Stat label="Quiz payments (test)" value={`${stats.payments.c} · ₹${stats.payments.s}`} />
          <Stat label="Certificates" value={String(stats.certs)} />
        </div>
      </div>

      <section>
        <h2 className="text-lg font-bold">ID review queue ({pendingIds.length})</h2>
        {pendingIds.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">Nothing waiting for review.</p>
        ) : (
          <ul className="mt-3 space-y-3">
            {pendingIds.map((u) => (
              <li key={u.id} className="rounded-xl bg-white border border-slate-200 p-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <div className="font-semibold">
                      {u.name} <span className="text-slate-400 font-normal">· {u.email} · {u.phone}</span>
                    </div>
                    <a
                      href={`/admin/id-file/${u.id_filename}`}
                      target="_blank"
                      className="text-sm text-indigo-600 underline"
                    >
                      View uploaded document
                    </a>
                  </div>
                  <div className="flex gap-2 items-center">
                    <form action={reviewId}>
                      <input type="hidden" name="userId" value={u.id} />
                      <input type="hidden" name="decision" value="approve" />
                      <button className="rounded-lg bg-emerald-600 text-white px-3 py-1.5 text-sm font-semibold hover:bg-emerald-700">
                        Approve
                      </button>
                    </form>
                    <form action={reviewId} className="flex gap-2">
                      <input type="hidden" name="userId" value={u.id} />
                      <input type="hidden" name="decision" value="reject" />
                      <input
                        name="reason"
                        placeholder="Reject reason"
                        className="rounded-lg border border-slate-300 px-2 py-1.5 text-sm w-40"
                      />
                      <button className="rounded-lg bg-rose-600 text-white px-3 py-1.5 text-sm font-semibold hover:bg-rose-700">
                        Reject
                      </button>
                    </form>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-lg font-bold">Open error reports ({reports.length})</h2>
        {reports.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">No open reports.</p>
        ) : (
          <ul className="mt-3 space-y-3">
            {reports.map((r) => (
              <li key={r.id} className="rounded-xl bg-white border border-slate-200 p-4">
                <div className="text-sm">
                  <span className="font-semibold">{r.course_title}</span> · lesson {r.position} ·{" "}
                  <span className="text-slate-400">{r.reporter}</span>
                </div>
                <p className="mt-1 text-sm text-slate-700">{r.message}</p>
                <div className="mt-2 flex gap-2">
                  <form action={resolveReport}>
                    <input type="hidden" name="reportId" value={r.id} />
                    <input type="hidden" name="status" value="fixed" />
                    <button className="rounded-lg bg-emerald-600 text-white px-3 py-1 text-xs font-semibold">
                      Mark fixed
                    </button>
                  </form>
                  <form action={resolveReport}>
                    <input type="hidden" name="reportId" value={r.id} />
                    <input type="hidden" name="status" value="dismissed" />
                    <button className="rounded-lg bg-slate-500 text-white px-3 py-1 text-xs font-semibold">
                      Dismiss
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-lg font-bold">Courses (publish / unpublish)</h2>
        <ul className="mt-3 space-y-2">
          {courses.map((c) => (
            <li key={c.id} className="flex items-center justify-between rounded-xl bg-white border border-slate-200 px-4 py-2.5">
              <div className="text-sm">
                <span className="font-semibold">{c.title}</span>{" "}
                <span className="text-slate-400">· ₹{c.price_inr} · by {c.created_by}</span>
                {!c.published ? <span className="ml-2 text-xs font-bold text-rose-600">UNPUBLISHED</span> : null}
              </div>
              <form action={togglePublish}>
                <input type="hidden" name="courseId" value={c.id} />
                <button
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold text-white ${
                    c.published ? "bg-rose-600 hover:bg-rose-700" : "bg-emerald-600 hover:bg-emerald-700"
                  }`}
                >
                  {c.published ? "Unpublish" : "Publish"}
                </button>
              </form>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-bold">Audit log (latest 25)</h2>
        <div className="mt-3 rounded-xl bg-white border border-slate-200 divide-y divide-slate-100 text-sm">
          {log.map((l, i) => (
            <div key={i} className="px-4 py-2 flex gap-3">
              <span className="text-slate-400 whitespace-nowrap">{l.created_at.slice(0, 16)}</span>
              <span className="font-mono text-xs bg-slate-100 rounded px-1.5 py-0.5 whitespace-nowrap">{l.action}</span>
              <span className="text-slate-600 truncate">
                {l.actor} — {l.detail}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white border border-slate-200 p-3 text-center">
      <div className="text-lg font-extrabold">{value}</div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  );
}
