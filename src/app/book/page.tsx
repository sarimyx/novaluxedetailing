import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Separator } from "@/components/ui/separator";
import PackagesComponent from "@/components/packages/packages-component";
import ReviewsComponent from "@/components/reviews/page";
import Footer from "@/components/footer";

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
