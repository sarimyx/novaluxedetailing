import { ContentLayout } from "@/components/admin-panel/content-layout";
import PackagesComponent from "@/components/packages/packages-component";

export default function Page() {
  return (
    <ContentLayout title="Book" hideSidebar>
      <PackagesComponent />
    </ContentLayout>
  );
}
