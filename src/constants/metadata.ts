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
    "car cleaning utah",
    "Nova Luxe Detailing",
  ],
  alternates: {
    canonical: "https://novaluxedetailing.com",
  },
  openGraph: {
    title: "Nova Luxe Detailing",
    description:
      "Premium auto detailing services in Utah. We aim to give you the royal experience. Book your detail today, in less than 3 clicks.",
    url: "https://novaluxedetailing.com",
    siteName: "Nova Luxe Detailing",
    images: [
      {
        url: "/logo-wheel.png",
        width: 500,
        height: 500,
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
