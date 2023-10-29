import { oneLine, stripIndent } from "common-tags";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const db = createClient(
      "https://oinlqhpqjsnaqpssmcek.supabase.co",
      process.env.DENO_SUPABASE_KEY ?? ""
    );
    const reqObj = {
      input: message || "What role does discipline play?",
    };
    const embeddedData = await fetch(
      "https://oinlqhpqjsnaqpssmcek.supabase.co/functions/v1/embed",
      {
        headers: {
          Authorization: `Bearer ${process.env.DENO_SUPABASE_KEY}`,
        },
        body: JSON.stringify(reqObj),
        method: "POST",
      }
    );
    const { embedding: embed } = await embeddedData.json();

    const { data, error } = await db.rpc("match_data_text", {
      query_embedding: embed,
      match_threshold: 0.74,
      match_count: 1,
    });

    const contextText = data
      .map((document: { content: any }) => document.content)
      .join(" ");
console.log(contextText);

    const apiKey = process.env.API_KEY || "AIzaSyAxdiG_tnvu4cWXxXIvR0IDcy_cociZ2qU";

    const prompt = stripIndent`${oneLine`
     
    input:${contextText}${reqObj.input}
     

      output:
    `}`;

    const requestBody = {
      prompt: {
        text: prompt,
      },
      maxOutputTokens: 1024,
      temperature: 0.5,
      candidate_count: 1,
      top_k: 40,
      top_p: 0.95,
      stop_sequences: [],
      safety_settings: [
        { category: "HARM_CATEGORY_DEROGATORY", threshold: 4 },
        { category: "HARM_CATEGORY_TOXICITY", threshold: 4 },
        { category: "HARM_CATEGORY_VIOLENCE", threshold: 4 },
        { category: "HARM_CATEGORY_SEXUAL", threshold: 4 },
        { category: "HARM_CATEGORY_MEDICAL", threshold: 4 },
        { category: "HARM_CATEGORY_DANGEROUS", threshold: 4 },
      ],
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      const result = responseData.candidates[0].output;
      // if (responseData.filters) {
      //   return NextResponse.json({
      //     user: {
      //       name: "Ai",
      //       avatar: "https://avatars.githubusercontent.com/u/60410876?s=48&v=4",
      //     },
      //     message: "Could not generate text",
      //   });
      // }
      return NextResponse.json({
        user: {
          name: "Ai",
          avatar: "https://avatars.githubusercontent.com/u/60410876?s=48&v=4",
        },
        message: result,
      });
    } else {
      console.error("Error generating text:", response.status);
      return NextResponse.json({
        user: {
          name: "Ai",
          avatar: "https://avatars.githubusercontent.com/u/60410876?s=48&v=4",
        },
        message: "Error generating text",
      });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json({
      user: {
        name: "Ai",
        avatar: "https://avatars.githubusercontent.com/u/60410876?s=48&v=4",
      },
      message: "An error occurred",
    });
  }
}
