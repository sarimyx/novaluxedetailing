"use client";

import { Button } from "@/components/ui/button";
import { LoadingIcon } from "@/components/ui/loading-icon";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignIn,
} from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    <>
      <ClerkLoading>
        <div className="flex min-h-screen flex-col items-center justify-center text-center">
          <LoadingIcon />
        </div>
      </ClerkLoading>
      <ClerkLoaded>
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
                <span className=" mb-4 max-w-80 text-5xl font-light bg-gradient-to-r from-violet-500 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  You&apos;re signed in.
                </span>
                <a href="/dashboard">
                  <Button
                    variant="default"
                    className="mb-4 w-fit rounded-lg"
                    size="sm"
                  >
                    Dashboard →
                  </Button>
                </a>
              </SignedIn>
              <SignedOut>
                <span className="max-w-80 text-5xl font-light bg-gradient-to-r from-violet-500 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Sign in.
                </span>
              </SignedOut>
            </div>
            <SignedOut>
              <SignIn forceRedirectUrl="/dashboard" />
            </SignedOut>
          </div>
        </div>
      </ClerkLoaded>
    </>
  );
}
