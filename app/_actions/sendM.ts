"use server";
const getBaseUrl = () => {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};
export const sendM = async ({ message }: { message: string }) => {
  // Create a Supabase client configured to use cookies
  const res = await fetch(`${getBaseUrl()}/api/messages`, {
    method: "POST",
    body: JSON.stringify({ message }),
  });
  const data = await res.json();
  const insertionD = {
    prompt: message,
    completion: data?.message,
  };
  const insertion = await fetch(`${getBaseUrl()}/api/insertdata`, {
    method: "POST",
    body: JSON.stringify({ insertionD }),
  });
  return data;
};
