import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";

import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "@/components/navbar";
import { LoadingIcon } from "@/components/ui/loading-icon";
import { Suspense } from "react";

import Script from "next/script";

export const runtime = "edge";

export const metadata: Metadata = {
  metadataBase: new URL("https://novaluxedetailing.com"),
  title: {
    default: "Nova Luxe Detailing",
    template: "%s | Nova Luxe Detailing",
  },
  description:
    "Premium auto detailing services in Utah. From interior deep cleans to ceramic coatings, we aim to give you the royal experience. Book your detail today, in less than 3 clicks.",
  keywords: [
    "auto detailing Utah",
    "car detailing",
    "ceramic coating",
    "interior cleaning",
    "mobile detailing",
    "utah county auto detail",
    "Nova Luxe Detailing",
  ],
  alternates: {
    canonical: "https://novaluxedetailing.com",
  },
  openGraph: {
    title: "Nova Luxe Detailing | Premium Auto Detailing in Utah",
    description:
      "Premium detailing services in Utah. In less than 3 clicks, book your detail and get a royal experience",
    url: "https://novaluxedetailing.com",
    siteName: "Nova Luxe Detailing",
    images: [
      {
        url: "https://novaluxedetailing.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nova Luxe Detailing",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nova Luxe Detailing",
    description: "Top-tier mobile auto detailing services in Utah.",
    images: ["https://novaluxedetailing.com/og-image.jpg"],
    creator: "@NovaLuxeDetailing",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
          {/* Google Ads */}
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=AW-10986242730`}
          />
          <Script
            id="google-ads"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'AW-10986242730');
    `,
            }}
          />

          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            forcedTheme="dark"
          >
            <Suspense
              fallback={
                <div className="flex min-h-screen flex-col items-center justify-center text-center">
                  <LoadingIcon />
                </div>
              }
            />
            <div className="min-h-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
              <Navbar />
              {children}
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
