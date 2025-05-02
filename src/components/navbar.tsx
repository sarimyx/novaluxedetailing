"use client";

import Link from "next/link";
import { MessageSquare, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { Identity } from "@/constants/identity";
import { Fonts } from "@/constants/fonts";
import Image from "next/image";
import { InstagramLogoIcon } from "@radix-ui/react-icons";

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
              src="/branding-kit/logo-wheel-transparent.png"
              alt="Nova Luxe Logo"
              className="rounded-lg"
              width={30}
              height={30}
            />
            {Identity.companyShortName.toUpperCase()}
          </span>
          <span className="sr-only">{Identity.companyName}</span>
        </Link>
        <nav className="ml-auto flex items-center gap-2">
          <a href={Identity.socialMedia.instagram} target="_blank">
            <Button
              className="rounded-full w-8 h-8 bg-background"
              variant="outline"
              size="icon"
            >
              <InstagramLogoIcon className="w-[1.2rem] h-[1.2rem]" />
            </Button>
          </a>
          <a href={`tel:${Identity.companyPhoneNumber}`}>
            <Button
              className="rounded-full w-8 h-8 bg-background"
              variant="outline"
              size="icon"
            >
              <PhoneCall className="w-[1.2rem] h-[1.2rem]" />
            </Button>
          </a>
          <a href={`sms:${Identity.companyPhoneNumber}`}>
            <Button
              className="rounded-full w-8 h-8 bg-background"
              variant="outline"
              size="icon"
            >
              <MessageSquare className="w-[1.2rem] h-[1.2rem]" />
            </Button>
          </a>
        </nav>
      </div>
    </header>
  );
}
