"use client";
import React from "react";
import { useAction, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import HistoryItem from "@/components/historyItem";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowBigRight } from "lucide-react";

const Page = () => {
  const entries = useQuery(api.startconsultation.getAllChats);
  console.log(entries);
  const router = useRouter();

  const convertMillisecondsToDate = (milliseconds: any) => {
    const date = new Date(milliseconds);
    return date.toLocaleDateString();
  };

  return (
    <div className="flex relative gap-3 min-h-screen flex-col justify-center items-center w-full md:px-0 px-4">
      {entries?.map((entry) => (
        <Button
          onClick={() => router.push(`/chat/${entry._id}`)}
          className="border bg-white flex items-center justify-between w-full border-secondary-foreground rounded-md p-2 h-12"
          key={entry._id}
        >
          <span className="text-primary">
            {convertMillisecondsToDate(entry._creationTime)}
          </span>
          <ArrowBigRight className="text-secondary-foreground" />
        </Button>
      ))}
    </div>
  );
};

export default Page;
