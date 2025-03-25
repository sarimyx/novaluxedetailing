import { ContentLayout } from "@/components/admin-panel/content-layout";
import { currentUser } from "@clerk/nextjs/server";
import { RedirectToSignIn } from "@clerk/nextjs";

export default async function CustomerDashboardPage() {
  const user = await currentUser();
  return !user ? (
    <RedirectToSignIn />
  ) : (
    <ContentLayout title="Dashboard">
      <div className="flex flex-col space-y-4">
        <span className="text-2xl">Coming soon.</span>
      </div>
    </ContentLayout>
  );
}
