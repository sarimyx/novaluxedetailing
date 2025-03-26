"use client";

import Link from "next/link";
import { PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  OrganizationSwitcher,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Identity } from "@/constants/identity";
import { Fonts } from "@/constants/fonts";
import { dark } from "@clerk/themes";
import Image from "next/image";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="z-[50] sticky top-0 w-full bg-background/95 border-b backdrop-blur-sm dark:bg-black/[0.6] border-border/40">
      <div className="container h-14 flex items-center">
        <Link
          href="/"
          className="flex justify-start items-center hover:opacity-85 transition-opacity duration-300"
        >
          <span
            className={`flex gap-1 items-center font-light tracking-widest ${Fonts.premium.className}`}
          >
            <Image
              src="/logo-wheel-transparent.png"
              alt=""
              className="rounded-lg"
              width={30}
              height={30}
            />
            {Identity.companyShortName.toUpperCase()}
          </span>
          <span className="sr-only">{Identity.companyName}</span>
        </Link>
        <nav className="ml-auto flex items-center gap-2">
          <SignedIn>
            {!pathname.includes("dashboard") && (
              <a href="/dashboard">
                <Button
                  variant="default"
                  className="rounded-full bg-violet-600 hover:bg-violet-500"
                  size="sm"
                  asChild
                >
                  <span>Dashboard</span>
                </Button>
              </a>
            )}
            {pathname.includes("dashboard") && (
              <span className="dark:bg-slate-900 rounded-lg">
                <OrganizationSwitcher
                  appearance={{ baseTheme: dark }}
                  afterSelectPersonalUrl="/dashboard/customer"
                  afterSelectOrganizationUrl={(org) => {
                    switch (org.name?.toLowerCase()) {
                      case "provider":
                        return `/dashboard/provider`;
                      case "staff":
                        return `/dashboard/staff`;
                      default:
                        return `/dashboard/customer`;
                    }
                  }}
                  afterLeaveOrganizationUrl="/"
                />
              </span>
            )}
          </SignedIn>
          <header className="flex justify-end items-center gap-2 h-16">
            <SignedOut>
              <SignInButton appearance={{ baseTheme: dark }}>
                <Button
                  variant="default"
                  className="rounded-full bg-violet-600 hover:bg-violet-500"
                  size="sm"
                >
                  <span>Login</span>
                </Button>
              </SignInButton>
              {/* <SignUpButton>
                                <Button
                                    variant="outline"
                                    className="rounded-full"
                                    size="sm"
                                >
                                    <span>Join</span>
                                </Button>
                            </SignUpButton> */}
            </SignedOut>
            <SignedIn>
              <UserButton appearance={{ baseTheme: dark }} />
            </SignedIn>
          </header>
          <a href={`tel:${Identity.companyPhoneNumber}`}>
            <Button
              className="rounded-full w-8 h-8 bg-background"
              variant="outline"
              size="icon"
            >
              <PhoneCall className="w-[1.2rem] h-[1.2rem]" />
            </Button>
          </a>
          {/* <ModeToggle /> */}
        </nav>
      </div>
    </header>
  );
}
