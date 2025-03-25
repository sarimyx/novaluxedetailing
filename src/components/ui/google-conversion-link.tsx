"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

export function GoogleConversionLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Prevent immediate navigation

    if (
      typeof window !== "undefined" &&
      typeof (window as any).gtag === "function"
    ) {
      (window as any).gtag("event", "conversion", {
        send_to: "AW-16947905102/CVeRCKrtwa4aEM6EspE_",
      });
    }

    setTimeout(() => {
      router.push(href);
    }, 200);
  };

  return (
    <Link href={href} passHref legacyBehavior>
      <a onClick={handleClick} className={className}>
        {children}
      </a>
    </Link>
  );
}
