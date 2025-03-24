import { ContentLayout } from "@/components/admin-panel/content-layout";
import { currentUser } from "@clerk/nextjs/server";
import { RedirectToSignIn } from "@clerk/nextjs";
import SelectOrganizationPage from "../select-organization/page";

export default async function DashboardPage() {
  const user = await currentUser();
  return !user ? (
    <RedirectToSignIn />
  ) : (
    <ContentLayout title="Dashboard">
      <SelectOrganizationPage />
    </ContentLayout>
  );
}
