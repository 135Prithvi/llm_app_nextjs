"use client";
import { sendM } from "@/app/_actions/sendM";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea"
import { experimental_useOptimistic as useOptimistic, useState } from "react";
import ReactMarkdown from "react-markdown";
interface Message {
  user: { name: string; avatar: string }; message: string;
}
export default function MessageClientComponent({
  messages,
}: {
  messages: Array<Message>;
}) {
  const [message, setMessage] = useState("");
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessageObj) => [...state, newMessageObj as Message]
  );

  async function sendMessage() {
    const obj = {
      user: {
        avatar: "https://github.com/shadcn.png",
        name: "shadcn",
      },
      message: `${message}`,
    };

    addOptimisticMessage(obj);
    const data = await sendM({ message });
    setMessage("");
    // await new Promise((r) => setTimeout(r, 3000));
    // const data = {
    //   user: {
    //     name: "Ai",
    //     avatar: "https://avatars.githubusercontent.com/u/60410876?s=48&v=4",
    //   },
    //   message: "Could not generate text",
    // };

    // const insertionD = {
    //   prompt: obj.message,
    //   completion: data?.message
    // }
    // const insertion = await fetch("/api/insertdata", {
    //   method: "POST",
    //   body: JSON.stringify({ insertionD }),
    // });
    addOptimisticMessage(data);
  }
  return (
    <>
      <div className="relative w-full h-[calc(100vh-64px)]">
        <div className="sm:container h-full px-2 sm:px-auto  overflow-y-auto pb-28">
          {/* <div className="flex gap-x-2 mt-6 border p-2 rounded-2xl h-auto">
            <div className="flex items-start ">
              <Avatar>
                <AvatarImage src={"item.user?.avatar"} alt="@ai" />
                <AvatarFallback>{"item.user.name"}</AvatarFallback>{" "}
              </Avatar>{" "}
            </div>
            <Label htmlFor="terms" className="leading-6 font-thin">
              <ReactMarkdown>
                Unemployment rate: 🇳🇬 Nigeria: 33.3% 🇿🇦 South Africa: 32.9% 🇮🇶
                Iraq: 15.55% 🇧🇦 Bosnia and Herzegovina: 13.3% 🇦🇫 Afghanistan:
                13.3% 🇪🇸 Spain: 11.6% 🇬🇷 Greece: 11.1% 🇺🇦 Ukraine: 10.5% 🇮🇷
                Iran: 9.7% 🇹🇷 Turkey: 9.5% 🇨🇴 Colombia: 9.34% 🇸🇪 Sweden: 9.2% 🇨🇱
                Chile: 8.53% 🇺🇾 Uruguay: 8.2%… France just lost another African
                country, Niger is heading towards multipolar World. Endless
                humiliation for France and Collective West. It is a clear trend
                that is accelerating. BRICS, SCO, de-dedollarization, kicking
                out France from Africa, Saudi Arabia dumping US and… the poorest
                country
              </ReactMarkdown>
            </Label>
          </div> */}
          {optimisticMessages.map((item) => (
            <div className="flex gap-x-2 mt-6 border p-2 rounded-2xl h-auto">
              <div className="flex items-start ">
                <Avatar>
                  <AvatarImage src={item.user?.avatar} alt="@ai" />
                  <AvatarFallback>{item.user.name}</AvatarFallback>{" "}
                </Avatar>{" "}
              </div>
              <Label htmlFor="terms" className="leading-6 font-thin">
                <ReactMarkdown>{item.message}</ReactMarkdown>
              </Label>
            </div>
          ))}
        </div>
        <div className="w-full flex grow p-5 sticky -bottom-0">
          <form action={sendMessage} className="w-full grow">
            <Input
              placeholder="Send input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              name="message"
              required
              minLength={3}
              className="rounded-3xl pl-7 dark:bg-[rgb(30,39,50)] dark:focus-visible:ring-[rgb(30,39,50)] grow h-12 "
            />
          </form>
        </div>
      </div>
    </>
  );
}
