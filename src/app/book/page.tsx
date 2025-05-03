import { ContentLayout } from "@/components/admin-panel/content-layout";
import Footer from "@/components/footer";
import PackagesComponent from "@/components/packages/packages-component";

export default function Page() {
  return (
    <ContentLayout title="Book" hideSidebar noHorizontalPadding>
      <PackagesComponent />
      <Footer />
    </ContentLayout>
  );
}
