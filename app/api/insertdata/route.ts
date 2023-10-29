import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function POST(req: Request) {
  const { insertionD } = await req.json();
  const db = createClient(
    "https://oinlqhpqjsnaqpssmcek.supabase.co",
    process.env.DENO_SUPABASE_KEY ?? ""
  );
  const sendtodb = await db.from("messages_dataset").insert({
    prompt: insertionD.prompt,
    completion: insertionD.completion,
  });
}
