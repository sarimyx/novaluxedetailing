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
