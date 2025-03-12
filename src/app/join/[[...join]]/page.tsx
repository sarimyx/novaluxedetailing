"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function JoinPage() {
  const router = useRouter();

  return (
    <>
      <div className="flex justify-center px-4 py-8">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <Button
              variant="secondary"
              className="mb-4 w-fit rounded-lg"
              size="sm"
              onClick={() => router.back()}
            >
              ← Back
            </Button>
            <SignedIn>
              <span className="max-w-80 text-5xl font-light bg-gradient-to-r from-violet-500 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                You&apos;re signed in.
              </span>
            </SignedIn>
            <SignedOut>
              <span className="max-w-80 text-5xl font-light bg-gradient-to-r from-violet-500 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Sign up,{" "}
                <strong className="font-bold rounded-lg">
                  with just your number.
                </strong>
              </span>
            </SignedOut>
          </div>
          <SignedOut>
            <SignUp />
          </SignedOut>
        </div>
      </div>
    </>
  );
}
