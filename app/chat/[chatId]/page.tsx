"use client";
import ChatHistory from "@/components/chatHistory";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, SendHorizontal, User2, UserCircle2 } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { useAction, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const Chat = (props: { params: { chatId: Id<"consultations"> } }) => {
  const [message, setMessage] = useState("");
  const consultationId = props.params.chatId;
  const contentRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const startConversation = useAction(api.chat.handlePlayerAction);
  const entries = useQuery(api.chat.getAllEntries, {
    chatId: consultationId,
  });
  // const [isloading, setIsLoading] = useState(false);
  // console.log(isloading);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("submitting message");
    try {
      await startConversation({ message, consultationId });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    setMessage("");
  };
  console.log(isLoading);

  return (
    <div className="flex relative min-h-screen w-full md:px-0 px-4">
      <div className="md:w-1/4">
        <ChatHistory />
      </div>

      <div className="md:w-1/2 w-full relative mt-20 flex flex-col justify-center items-center">
        <div className="flex flex-col  items-center overflow-y-auto scrollbar-hide justify-center gap-5">
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

            <div
              ref={contentRef}
              className="flex flex-col overflow-y-auto md:gap-0 gap-2"
            >
              {entries?.map((entry) => {
                return (
                  <div className="flex flex-col gap-2 md:p-2" key={entry._id}>
                    {entry.input && (
                      <div className="bg-[#e3ebf3] space-y-2 rounded-md p-2">
                        <section className="flex items-center gap-1">
                          <h2 className="font-semibold">User</h2>
                          <UserCircle2 />
                        </section>

                        <p className="text-secondary-foreground">
                          {entry.input}
                        </p>
                      </div>
                    )}
                    {entry.response && (
                      <div className="bg-secondary p-2 space-y-2 rounded-md">
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
              {isLoading && (
                <div className="flex">
                  <span className="circle animate-loader"></span>
                  <span className="circle animate-loader animation-delay-200"></span>
                  <span className="circle animate-loader animation-delay-400"></span>
                </div>
              )}
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
