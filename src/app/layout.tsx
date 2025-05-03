import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";

import { Navbar } from "@/components/navbar";
import { LoadingIcon } from "@/components/ui/loading-icon";
import { Suspense } from "react";

import Script from "next/script";
import { Fonts } from "@/constants/fonts";
import { SiteMetadata } from "@/constants/metadata";
import { Toaster } from "@/components/ui/toaster";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = SiteMetadata;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={Fonts.default.className}>
        {/* Google Ads */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-11202037395"
        />
        <Script
          id="google-ads"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'AW-11202037395');
              `,
          }}
        />

        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          <Suspense
            fallback={
              <div className="flex min-h-screen flex-col items-center justify-center text-center">
                <LoadingIcon />
              </div>
            }
          >
            <div className="min-h-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
              <Navbar />
              <Toaster />
              {children}
              <Analytics />
              <SpeedInsights />
            </div>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
