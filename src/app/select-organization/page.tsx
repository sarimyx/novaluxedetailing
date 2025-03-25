"use client";

import { Styling } from "@/constants/styling";
import {
  OrganizationList,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function SelectOrganizationPage() {
  return (
    <>
      <SignedIn>
        <div className="flex justify-center px-4 py-8">
          <div className="flex flex-col space-y-4">
            <span
              className={`max-w-80 text-5xl font-light ${Styling.GoldChromatic}`}
            >
              Select your organization.
            </span>
            <OrganizationList
              appearance={{ baseTheme: dark }}
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
