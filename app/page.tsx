"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const startConsultation = useMutation(
    api.startconsultation.createConsultation
  );
  return (
    <main className="flex h-screen px-5 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100 via-white  to-white flex-col items-center justify-center">
      <h1 className="text-primary font-bold text-6xl tracking-wide">
        MediMind
      </h1>
      <p className="md:text-base text-sm text-secondary-foreground text-center opacity-75">
        Experience instant symptom analysis with our advanced AI doctor.
      </p>
      <Button
        className="mt-5"
        onClick={async (e) => {
          e.preventDefault();
          const chatId = await startConsultation();
          router.push(`/chat/${chatId}`);
        }}
        size={"lg"}
      >
        Get Started
      </Button>
    </main>
  );
}
