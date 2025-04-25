import { Metadata } from "next";

export const SiteMetadata: Metadata = {
  metadataBase: new URL("https://novaluxedetailing.com"),
  title: {
    default: "Nova Luxe Detailing",
    template: "%s | Nova Luxe Detailing",
  },
  description:
    "Premium auto detailing services in Utah. We aim to give you the royal experience. Book your detail today, in less than 3 clicks.",
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
      "Premium auto detailing services in Utah. Book us in less than 3 clicks.",
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};
