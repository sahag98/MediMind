"use client";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { ArrowRight, History } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  return (
    <nav className="flex fixed w-full md:px-24 px-4 z-10 backdrop-blur-md border-b p-2 items-center justify-between">
      <Link href="/">
        <Image
          src="/medimind.png"
          alt="logo"
          className="object-cover w-14 h-14"
          width={500}
          height={500}
        />
      </Link>
      <ul className="flex items-center gap-x-3">
        <Button
          onClick={() => router.push("/history")}
          className="bg-white md:hidden border border-primary"
        >
          <span className="text-primary">History</span>{" "}
          <History className="ml-2 text-primary" />
        </Button>
        <Button variant={"outline"}>Sign In</Button>
      </ul>
    </nav>
  );
};

export default Navbar;
