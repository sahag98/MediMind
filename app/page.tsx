import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex h-[calc(100vh-100px)] px-5 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100 via-white  to-white flex-col items-center justify-center">
      <h1 className="text-primary font-bold text-6xl tracking-wide">
        MediMind
      </h1>
      <p className="md:text-base text-sm text-secondary-foreground text-center opacity-75">
        Experience instant symptom analysis, consultations with our advanced AI
        doctor.
      </p>
      <Link
        href="/chat"
        className={buttonVariants({
          size: "lg",
          className: "mt-5",
        })}
      >
        Get Started
      </Link>
    </main>
  );
}
