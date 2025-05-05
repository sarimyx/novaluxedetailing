import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Separator } from "@/components/ui/separator";
import PackagesComponent from "@/components/packages/packages-component";
import ReviewsComponent from "@/components/reviews/page";
import Footer from "@/components/footer";
import { SiteMetadata } from "@/constants/metadata";
import { Metadata } from "next";

export const metadata: Metadata = {
  ...SiteMetadata,
  title: {
    absolute: "Book Your Detail | Utah's Premier Mobile Detailing",
  },
  description:
    "We offer full interior, exterior, and ceramic coating options...",
  openGraph: {
    ...SiteMetadata.openGraph,
    title: "Book Your Detail | Utah's Premium Mobile Auto Detailing Service",
    description:
      "We offer full interior, exterior, and ceramic coating options. Book a detail in 3 clicks.",
    url: "https://novaluxedetailing.com/book",
    images: [
      {
        url: "https://novaluxedetailing.com/branding-kit/on-the-job/1.jpeg",
        width: 1200,
        height: 630,
        alt: "Nova Luxe Detailing",
      },
    ],
  },
};

export default function Page() {
  return (
    <ContentLayout title="Book" hideSidebar noHorizontalPadding>
      <PackagesComponent />
      <Separator />
      <ReviewsComponent />
      <Separator />
      <Footer />
    </ContentLayout>
  );
}
