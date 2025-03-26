import { currentUser } from "@clerk/nextjs/server";
import { RedirectToSignIn } from "@clerk/nextjs";
import SelectOrganizationPage from "../select-organization/page";

export default async function DashboardPage() {
  const user = await currentUser();
  return !user ? <RedirectToSignIn /> : <SelectOrganizationPage />;
}
