import Link from "next/link";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { currentUser } from "@clerk/nextjs/server";
import { RedirectToSignIn } from "@clerk/nextjs";
import { Styling } from "@/constants/styling";
import { Button } from "@/components/ui/button";

export default async function StaffDashboardPage() {
  // const { getToken } = await auth();
  const user = await currentUser();
  return !user ? (
    <RedirectToSignIn />
  ) : (
    <ContentLayout title="Dashboard">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Staff</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col space-y-8 py-4">
        <section className="flex flex-col">
          <span className="text-slate-700 dark:text-slate-300 font-light">
            <strong>Login:</strong>{" "}
            {user.primaryPhoneNumber?.phoneNumber ?? "--"}
          </span>
          <span className="text-slate-700 dark:text-slate-300 font-light">
            <strong>ID:</strong> {user.id}
          </span>
        </section>
        <section className="flex flex-col space-y-4">
          <span className={`text-5xl ${Styling.Chromatic}`}>Databases</span>
          <a href="/dashboard/staff/databases/services">
            <Button className="w-fit">Services →</Button>
          </a>
        </section>
        <section className="flex flex-col space-y-4">
          <span className={`text-5xl ${Styling.Chromatic}`}>Bookings</span>
          <span className="text-slate-700 dark:text-slate-300 font-light">
            Coming soon.
          </span>
        </section>
        <section className="flex flex-col space-y-4">
          <span className={`text-5xl ${Styling.Chromatic}`}>Users</span>
          <span className="text-slate-700 dark:text-slate-300 font-light">
            Coming soon.
          </span>
        </section>
      </div>
    </ContentLayout>
  );
}
