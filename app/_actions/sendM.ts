"use server";

export const sendM = async ({ message }: { message: string }) => {
  // Create a Supabase client configured to use cookies
  const res = await fetch(`/api/messages`, {
    method: "POST",
    body: JSON.stringify({ message }),
  });
  const data = await res.json();
  const insertionD = {
      prompt: message,
      completion: data?.message
    }
    const insertion = await fetch("/api/insertdata", {
      method: "POST",
      body: JSON.stringify({ insertionD }),
    });
  return data
};
