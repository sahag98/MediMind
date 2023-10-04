import ChatHistory from "@/components/chatHistory";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizontal } from "lucide-react";
import Image from "next/image";
import React from "react";

const Chat = () => {
  return (
    <div className="flex h-[calc(100vh-100px)] px-4">
      <ChatHistory />

      <div className="w-full items-center flex flex-col justify-between">
        <div className="flex flex-col items-center justify-center gap-5">
          <Image
            src="/chat-img.png"
            className="w-64 mt-10"
            width={500}
            height={500}
            alt="chat image"
          />
          <span className="text-primary text-center text-sm">
            How are you feeling today? The more accurate your response is, the
            easier and faster I'll be able to help you.
          </span>
        </div>
        <form className="flex items-center justify-center w-full">
          <Input
            placeholder="How are you feeling?"
            className="md:w-2/3 shadow-lg shadow-primary/20 bg-secondary"
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
