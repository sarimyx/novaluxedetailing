import { ContentLayout } from "@/components/admin-panel/content-layout";
import { currentUser } from "@clerk/nextjs/server";
import { RedirectToSignIn } from "@clerk/nextjs";
import { Styling } from "@/constants/styling";
import { Button } from "@/components/ui/button";

export default async function StaffDashboardPage() {
  const user = await currentUser();
  return !user ? (
    <RedirectToSignIn />
  ) : (
    <ContentLayout title="Dashboard">
      <div className="flex flex-col space-y-8 py-4">
        <section className="flex flex-col">
          <span className="text-slate-700 dark:text-slate-300 font-light">
            <strong>Login:</strong>{" "}
            {user.primaryPhoneNumber?.phoneNumber ?? "--"}
          </span>
        </section>
        <section className="flex flex-col space-y-4">
          <span className={`text-5xl ${Styling.GoldChromatic}`}>Databases</span>
          <a href="/dashboard/staff/databases/services">
            <Button className="w-fit">Services →</Button>
          </a>
        </section>
        <section className="flex flex-col space-y-4">
          <span className={`text-5xl ${Styling.GoldChromatic}`}>Bookings</span>
          <span className="text-slate-700 dark:text-slate-300 font-light">
            Coming soon.
          </span>
        </section>
        <section className="flex flex-col space-y-4">
          <span className={`text-5xl ${Styling.GoldChromatic}`}>Users</span>
          <span className="text-slate-700 dark:text-slate-300 font-light">
            Coming soon.
          </span>
        </section>
      </div>
    </ContentLayout>
  );
}
