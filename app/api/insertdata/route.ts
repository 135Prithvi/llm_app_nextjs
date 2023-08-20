import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const { insertionD } = await req.json();
  const db = createServerComponentClient({ cookies })
  const sendtodb = await db.from('messages_dataset').insert({
    prompt:insertionD.prompt,
    completion:insertionD.completion
  })
}
