import { cookies } from "next/headers";
import crypto from "crypto";
import { getDb, now } from "./db";

export type SessionUser = {
  id: number;
  email: string;
  name: string;
  phone: string | null;
  phone_verified: number;
  language: string;
  id_status: string;
  id_reject_reason: string | null;
  is_admin: number;
};

const SESSION_COOKIE = "bodhi_session";
const SESSION_DAYS = 30;

export async function createSession(userId: number) {
  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + SESSION_DAYS * 86400_000);
  const db = await getDb();
  await db.collection("sessions").insertOne({
    token,
    user_id: userId,
    expires_at: now(SESSION_DAYS * 86400),
  });
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires,
    path: "/",
  });
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const db = await getDb();
  const session = (await db.collection("sessions").findOne({ token })) as {
    user_id: number;
    expires_at: string;
  } | null;
  if (!session || session.expires_at <= now()) return null;
  const user = (await db.collection("users").findOne({ id: session.user_id })) as
    | (SessionUser & { password_hash?: string })
    | null;
  if (!user) return null;
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    phone: user.phone,
    phone_verified: user.phone_verified,
    language: user.language,
    id_status: user.id_status,
    id_reject_reason: user.id_reject_reason,
    is_admin: user.is_admin,
  };
}

export async function destroySession() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (token) {
    const db = await getDb();
    await db.collection("sessions").deleteOne({ token });
  }
  jar.delete(SESSION_COOKIE);
}
