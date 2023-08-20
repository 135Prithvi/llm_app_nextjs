import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";
import { codeBlock, oneLine, stripIndent } from "common-tags";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { pipeline } from "@xenova/transformers";
import { HfInference } from "@huggingface/inference";

export async function POST(req: Request) {
  const { message } = await req.json();
  const db = createServerComponentClient({ cookies });
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
  // console.log(embed);

  const { data, error } = await db.rpc("match_data_text", {
    query_embedding: embed,
    match_threshold: 0.74,
    match_count: 2,
  });
  console.log(data, "matced data");
  const contextText = data
    .map((document: { content: any }) => document.content)
    .join(" ");
  console.log(contextText, "context data");

  // const contextText = data[0].content;
  const apiKey = process.env.API_KEY || ''; // Replace with your actual API key
  // Answer the question using the context or example of question Answer. Respond with only the text provided.
  const prompt = stripIndent`${oneLine`
  Output in markdown format.
          input:${contextText}
          
          ${reqObj.input}
    
          In markdown format.
          output:
          `}
        `;
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

  // const inference = new HfInference("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");
  // const out = await inference.textGeneration({
  //   model: "bigscience/bloom",
  //   inputs: prompt,
  // });
  // console.log(out);
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
  const y = 4;
  const x = 5;
  if (response.ok) {
    // Handle the generated text in the responseData
    const responseData = await response.json();
    console.log(responseData); ///end
    const result = responseData.candidates[0].output;
    if (responseData.filters) {
      return NextResponse.json({
        user: {
          name: "Ai",
          avatar: "https://avatars.githubusercontent.com/u/60410876?s=48&v=4",
        },
        message: "Could not generate text",
      });
    }

    return NextResponse.json({
      user: {
        name: "Ai",
        avatar: "https://avatars.githubusercontent.com/u/60410876?s=48&v=4",
      },
      message: result,
    });
  } else {
    console.error("Error generating text:", 422);
    return NextResponse.json({
      user: {
        name: "Ai",
        avatar: "https://avatars.githubusercontent.com/u/60410876?s=48&v=4",
      },
      message: "Error generating text",
    });
  }
}
