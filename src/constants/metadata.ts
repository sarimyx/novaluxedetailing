import { Metadata } from "next";

export const SiteMetadata: Metadata = {
  metadataBase: new URL("https://novaluxedetailing.com"),
  title: {
    default:
      "Nova Luxe Detailing | Premium Auto Detailing in Utah County & Nearby Cities | 3 Clicks to Book",
    template:
      "%s | Nova Luxe Detailing - Utah's Premium Auto Detailing Service",
  },
  description:
    "Utah's Premier Mobile Detailing. Book a full service in 3 clicks: interior, exterior, or ceramic coating. We bring your car back to life.",
  keywords: [
    "auto detailing Utah",
    "mobile detailing Utah County",
    "ceramic coating Utah",
    "interior detailing Provo",
    "paint correction Utah",
    "premium car detailing",
    "mobile car wash",
    "professional auto detailing",
    "Utah County auto detail",
    "car cleaning utah",
    "Nova Luxe Detailing",
    "luxury car detailing",
    "Provo car detailing",
    "Orem auto detailing",
    "Salt Lake City auto detailing",
  ],
  alternates: {
    canonical: "https://novaluxedetailing.com",
  },
  openGraph: {
    title: "Nova Luxe Detailing | Utah's Premier Mobile Auto Detailing",
    description:
      "Premium mobile car detailing in Utah County. Interior, exterior, and ceramic coating services delivered to your door. Book online in 3 clicks.",
    url: "https://novaluxedetailing.com",
    siteName: "Nova Luxe Detailing",
    images: [
      {
        url: "https://novaluxedetailing.com/branding-kit/logo-nova-luxe-detailing-large.png",
        width: 1200,
        height: 630,
        alt: "Nova Luxe Detailing Logo and Branded Vehicle",
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
