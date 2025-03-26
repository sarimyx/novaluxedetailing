import { ContentLayout } from "@/components/admin-panel/content-layout";
import { UserProfile } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function ManageAccount() {
  return (
    <ContentLayout title="Manage Profile">
      <section className="flex flex-col space-y-4">
        <span className="text-4xl font-light">Manage profile</span>
        <UserProfile appearance={{ baseTheme: dark }} />
      </section>
    </ContentLayout>
  );
}
