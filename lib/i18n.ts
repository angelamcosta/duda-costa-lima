import { cookies } from "next/headers";

export type Lang = "en" | "pt";

export async function getLang(): Promise<Lang> {
  const cookieStore = await cookies();
  const stored = cookieStore.get("me_lang")?.value;
  if (stored === "en" || stored === "pt") return stored;
  return "en";
}
