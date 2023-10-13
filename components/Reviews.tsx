"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Quote, SendHorizontal } from "lucide-react";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { Button } from "./ui/button";
import { SignInButton, useUser } from "@clerk/clerk-react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
const Reviews = () => {
  const { user } = useUser();

  console.log("user: ", user?.id);
  const { isAuthenticated, isLoading } = useConvexAuth();
  const [review, setReview] = useState("");

  const writeReview = useMutation(api.review.createReview);
  const reviews = useQuery(api.review.getAllReviews);

  console.log(reviews);
  const handleAddReview = async () => {
    try {
      if (user) {
        await writeReview({
          review,
          user_id: user.id,
          user_image: user?.imageUrl,
          user_name: user?.fullName!,
        });
      }
    } catch (error) {
      console.log(error);
    }
    setReview("");
  };

  return (
    <div className="flex bg-secondary px-4 py-10 md:px-24 flex-col justify-center items-center gap-5">
      <h2 className="text-center text-3xl font-bold text-secondary-foreground">
        Reviews
      </h2>
      <p className="text-center text-sm">
        Thank you for giving MediMind a try! Our hope is that MediMind was able
        to help you with your medical concerns. Feel free to let us know what
        you think!
      </p>
      {isAuthenticated ? (
        <section className="md:w-1/2 w-full flex items-center gap-5">
          <Input
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write a review..."
            className=""
          />
          <SendHorizontal
            size={30}
            onClick={handleAddReview}
            className="text-primary hover:cursor-pointer hover:text-primary/80 transition-all"
          />
        </section>
      ) : (
        <SignInButton mode="modal">
          <Button variant={"outline"}>Sign In to write a review</Button>
        </SignInButton>
      )}

      <section className=" flex flex-wrap mt-5 gap-8 w-full">
        {reviews?.length == 0 ? (
          <div className="flex w-full items-center justify-center">
            <p className="text-center rounded-md font-medium">
              No Reviews yet!
            </p>
          </div>
        ) : (
          <>
            {reviews?.map((review) => (
              <div
                className="flex flex-col bg-white items-center justify-between gap-2 py-5 px-4 shadow-2xl rounded  shadow-blue-200 w-full md:w-80 h-72"
                key={review._id}
              >
                <Image
                  alt="quotes"
                  src="/quotes.png"
                  width={500}
                  height={500}
                  className="w-10"
                />
                <p className="text-secondary-foreground text-center">
                  {review.review}
                </p>
                <section className="flex flex-col gap-2 items-center">
                  <Image
                    src={review.user_image}
                    width={70}
                    height={70}
                    className="rounded-full"
                    alt={review.user_image}
                  />
                  <h3 className="text-secondary-foreground font-medium">
                    {review.user_name}
                  </h3>
                </section>
              </div>
            ))}
          </>
        )}
      </section>
    </div>
  );
};

export default Reviews;
