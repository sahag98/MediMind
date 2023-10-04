import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex h-[calc(100vh-100px)] flex-col items-center justify-center">
      <h1 className="text-primary font-bold text-6xl tracking-wide">
        MediMind
      </h1>
      <p className="md:text-base text-sm text-secondary-foreground text-center opacity-75">
        Experience instant symptom analysis, consultations with our advanced AI
        doctor.
      </p>
      <Button className="mt-5" size={"lg"}>
        Get Started
      </Button>
    </main>
  );
}
