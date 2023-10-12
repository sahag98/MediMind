"use client";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { ArrowRight, History } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignInButton, UserButton } from "@clerk/clerk-react";

import { useConvexAuth } from "convex/react";
import { Spinner } from "./spinner";

const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();
  return (
    <nav className="flex fixed w-full md:px-24 px-4 z-10 backdrop-blur-md border-b py-2 items-center justify-between">
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
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant={"outline"}>Sign In</Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button
              size={"sm"}
              onClick={() => router.push("/history")}
              className="bg-white border text-primary hover:text-primary-foreground border-primary"
            >
              <span>History</span> <History className="ml-2" />
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
        {/* <SignedIn>
          <Button
            size={"sm"}
            onClick={() => router.push("/history")}
            className="bg-white border text-primary hover:text-primary-foreground border-primary"
          >
            <span>History</span> <History className="ml-2" />
          </Button>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <SignInButton afterSignInUrl="/">
            <Button variant={"outline"}>Sign In</Button>
          </SignInButton>
        </SignedOut> */}
        {/* {user ? (
          <div>
            <Image
              className="rounded-full"
              src={user.imageUrl}
              alt="user img"
              width={40}
              height={40}
            />
          </div>
        ) : (
          <SignInButton afterSignInUrl="/">
            <Button variant={"outline"}>Sign In</Button>
          </SignInButton>
        )} */}
      </ul>
    </nav>
  );
};

export default Navbar;
