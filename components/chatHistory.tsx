"use client";
import React, { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowBigRight, History, Plus } from "lucide-react";

const ChatHistory = ({ params }: any) => {
  console.log("param :", params);

  const entries = useQuery(api.startconsultation.getAllChats);

  const [selected, setSelected] = useState("");
  const router = useRouter();

  const convertMillisecondsToDate = (milliseconds: any) => {
    const date = new Date(milliseconds);

    return date.toLocaleDateString();
  };

  const startConsultation = useMutation(
    api.startconsultation.createConsultation
  );

  const handleHistory = (id: any) => {
    setSelected(id);
    router.push(`/chat/${id}`);
  };

  return (
    <div className="flex border-r relative h-screen flex-col items-center w-72 gap-10 mt-[73px]">
      <div className="w-full">
        <section className="flex mt-5 px-2 justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-secondary-foreground">History</h2>
            <History className="text-secondary-foreground" />
          </div>
          <Button
            variant={"ghost"}
            onClick={async (e) => {
              e.preventDefault();
              const chatId = await startConsultation({});
              router.push(`/chat/${chatId}`);
            }}
            className={
              "rounded-md text-primary bg-primary/25 transition-all hover:text-primary-foreground hover:bg-primary flex items-center justify-between border-secondary-foreground p-3 h-12"
            }
          >
            <Plus />
          </Button>
        </section>
      </div>
      <div className="w-full p-2 overflow-y-auto">
        {entries?.map((entry) => (
          <div key={entry._id}>
            {entry._id == params ? (
              <Button
                onClick={() => handleHistory(entry._id)}
                className={
                  "text-primary-foreground transition-all hover:text-primary-foreground hover:bg-primary flex items-center justify-between w-full border-secondary-foreground rounded-md p-2 h-12"
                }
                key={entry._id}
              >
                <span className="">
                  {convertMillisecondsToDate(entry._creationTime)}
                </span>
                <ArrowBigRight className="" />
              </Button>
            ) : (
              <Button
                variant={"ghost"}
                onClick={() => handleHistory(entry._id)}
                className={
                  "text-primary transition-all hover:text-primary-foreground hover:bg-primary flex items-center justify-between w-full border-secondary-foreground rounded-md p-2 h-12"
                }
                key={entry._id}
              >
                <span className="">
                  {convertMillisecondsToDate(entry._creationTime)}
                </span>
                <ArrowBigRight className="" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatHistory;
