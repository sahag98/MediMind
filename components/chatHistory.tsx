import React from "react";
import { Button } from "./ui/button";

const ChatHistory = () => {
  return (
    <div className="border-r border-l fixed h-screen z-30 bg-white justify-center items-center mt-[73px] hidden md:flex w-1/6 ">
      <Button>
        <h2 className="font-bold">Sign in to view your history.</h2>
      </Button>
    </div>
  );
};

export default ChatHistory;
