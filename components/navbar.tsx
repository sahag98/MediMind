import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between">
      <Image
        src="/medimind.png"
        alt="logo"
        className="object-cover w-14 h-14"
        width={500}
        height={500}
      />
      <ul className="flex items-center gap-x-3">
        <Button variant={"outline"}>Sign In</Button>
        <Button>
          <span>Get Started</span> <ArrowRight className="ml-2" />
        </Button>
      </ul>
    </nav>
  );
};

export default Navbar;
