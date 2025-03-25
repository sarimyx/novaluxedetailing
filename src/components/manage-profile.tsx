import { ContentLayout } from "@/components/admin-panel/content-layout";
import { UserProfile } from "@clerk/nextjs";

export default function ManageAccount() {
  return (
    <ContentLayout title="Manage Profile" hideSidebar>
      <section className="flex flex-col space-y-4">
        <span className="text-4xl font-light">Manage profile</span>
        <UserProfile />
      </section>
    </ContentLayout>
  );
}
