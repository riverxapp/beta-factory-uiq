import { createClient } from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { User, Session } from "@/types/crm";

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;
  if (!token) return null;
  const db = await createClient();
  const { data } = await db.from("sessions").select("*").eq("id", token).single();
  return data as Session | null;
}

export async function getCurrentUser(): Promise<User | null> {
  const session = await getSession();
  if (!session) return null;
  const db = await createClient();
  const { data } = await db.from("users").select("*").eq("id", session.userId).single();
  return data as User | null;
}

export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

export async function signIn(email: string, password: string): Promise<boolean> {
  const db = await createClient();
  const { data } = await db.from("users").select("id, password_hash").eq("email", email).single();
  if (!data) return false;
  const valid = await comparePassword(password, data.password_hash);
  if (!valid) return false;
  const { error } = await db.from("sessions").insert({ userId: data.id });
  return !error;
}
