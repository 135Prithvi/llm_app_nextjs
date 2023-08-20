import MessageClientComponent from "@/components/MessageClientComponent";

export const dynamic = "force-dynamic";
export default async function Chat() {
  return (
    <>
      <div className="relative w-full h-[calc(100vh-68px)] flex overflow-hidden">
        <div className="w-60 h-full p-2 border-2 overflow-hidden hidden sm:block"></div>
        <MessageClientComponent messages={[]}/>
      </div>
    </>
  );
}
{
  /* The experience of being in jail is unique to the
                      individual, and there are many factors that can affect how
                      it is experienced. Some of the things that may contribute
                      to the experience of being in jail include the length of
                      time spent there, the conditions of the facility, the
                      relationships with other inmates and staff, and the
                      individual's own mental and emotional state.*/
}
