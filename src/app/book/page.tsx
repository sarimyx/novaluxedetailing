import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Separator } from "@/components/ui/separator";
import PackagesComponent from "@/components/packages/packages-component";
import ReviewsComponent from "@/components/reviews/page";
import Footer from "@/components/footer";
import { SiteMetadata } from "@/constants/metadata";

export const metadata = {
  ...SiteMetadata,
  title: `Book Your Detail | Nova Luxe Detailing | Utah's Premier Mobile Detailing`,
  description:
    "We offer full interior, exterior, and ceramic coating options. Professional service that comes to you.",
  openGraph: {
    title: `Book Your Detail | Nova Luxe Detailing | Utah's Premier Mobile Detailing`,
    description:
      "We offer full interior, exterior, and ceramic coating options. Professional service that comes to you.",
    url: `https://novaluxedetailing.com/book`,
    siteName: "Nova Luxe Detailing",
    images: [
      {
        url: `https://novaluxedetailing.com/package-covers/package-cover-interior-package.jpeg`,
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
