"use client";

import {
  OrganizationList,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

export default function SelectOrganizationPage() {
  return (
    <>
      <SignedIn>
        <div className="flex justify-center px-4 py-8">
          <div className="flex flex-col space-y-4">
            <span className="max-w-80 text-5xl font-light bg-gradient-to-r from-violet-500 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Select your organization.
            </span>
            <OrganizationList
              afterSelectOrganizationUrl={(org) =>
                `/dashboard${org.slug ? `/${org.slug}` : ""}`
              }
              afterSelectPersonalUrl={() => `/dashboard/customer`}
            />
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
