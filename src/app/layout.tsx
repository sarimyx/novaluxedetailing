import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";

import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "@/components/navbar";
import { LoadingIcon } from "@/components/ui/loading-icon";
import { Suspense } from "react";
import { Identity } from "@/constants/identity";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.APP_URL
      ? `${process.env.APP_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : `http://localhost:${process.env.PORT || 3000}`,
  ),
  title: Identity.companyName,
  description:
    "Auto detailing services for Utah. We offer a variety of detailing services for your vehicle. Book an appointment today!",
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider signInUrl="/login" signUpUrl="/join">
      <html lang="en" suppressHydrationWarning>
        <body className={GeistSans.className}>
          <ThemeProvider attribute="class" defaultTheme="light">
            <Suspense
              fallback={
                <div className="flex min-h-screen flex-col items-center justify-center text-center">
                  <LoadingIcon />
                </div>
              }
            />
            <div>
              <Navbar />
              {children}
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
