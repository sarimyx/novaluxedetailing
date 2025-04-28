import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Badge } from "@/components/ui/badge";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, BookOpenIcon } from "lucide-react";

export default async function ProviderDashboard() {
  const { userId } = await auth();
  if (!userId) return null;
  const user = (await clerkClient()).users.getUser(userId);

  return (
    <ContentLayout title="Dashboard">
      <div className="flex flex-col space-y-4">
        <section className="flex gap-2">
          <Badge variant="secondary">
            {(await user).primaryPhoneNumber?.phoneNumber ??
              "Missing phone number"}
          </Badge>
          <Badge variant="destructive">Detailer</Badge>
        </section>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <BookOpenIcon className="h-5 w-5" />
              Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>No bookings currently.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Standard Timings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>No timings set.</p>
          </CardContent>
        </Card>
      </div>
    </ContentLayout>
  );
}
