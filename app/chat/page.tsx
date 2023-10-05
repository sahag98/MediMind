"use client";
import ChatHistory from "@/components/chatHistory";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, SendHorizontal } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useAction, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const Chat = () => {
  const [message, setMessage] = useState("");
  const startConversation = useAction(api.chat.handlePlayerAction);
  const entries = useQuery(api.chat.getAllEntries);
  // const [isloading, setIsLoading] = useState(false);
  // console.log(isloading);
  const handleSubmit = (e: any) => {
    // setIsLoading(true);
    e.preventDefault();
    try {
      startConversation({ message });
    } catch (error) {
      console.log(error);
    } finally {
      // setIsLoading(false);
    }
    setMessage("");
  };

  // const array = entries[0].response.split("[");
  // console.log(array[1]);
  return (
    <div className="flex px-4">
      <ChatHistory />

      <div className="w-full relative items-center flex flex-col justify-between">
        <div className="flex flex-col items-center overflow-y-auto scrollbar-hide justify-center gap-5">
          <Image
            src="/chat-img.png"
            className="w-64 mt-10"
            width={500}
            height={500}
            alt="chat image"
          />
          <div className="flex flex-col gap-1 mb-24">
            <span className="text-primary text-center text-base">
              How are you feeling today?
            </span>
            <span className="text-secondary-foreground text-center text-sm mb-10">
              The more accurate your responses, the easier and faster I&apos;ll
              be able to help you.
            </span>
            <div className="flex  flex-col gap-2">
              {entries?.map((entry) => {
                return (
                  <div className="flex flex-col gap-2 md:p-2" key={entry._id}>
                    {entry.input && (
                      <div className="bg-[#e3ebf3] rounded-md p-2">
                        <h2 className="font-semibold">User</h2>
                        <p className="text-secondary-foreground">
                          {entry.input}
                        </p>
                      </div>
                    )}
                    {entry.response && (
                      <div className="bg-secondary p-2 rounded-md">
                        <section className="flex items-center gap-1">
                          {" "}
                          <h2 className="font-semibold">MediMind</h2>
                          <Bot />
                        </section>

                        <p className="text-secondary-foreground">
                          {entry.response}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex fixed z-10 bottom-4 px-4 items-center justify-center w-full"
        >
          <Input
            placeholder="How are you feeling?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="md:w-1/2 shadow-md shadow-primary/20 bg-secondary"
          />
          <button>
            <SendHorizontal className="ml-2 h-12 w-12 text-primary hover:bg-primary/10 rounded-full transition-all p-2" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
