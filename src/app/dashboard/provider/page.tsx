"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { useUser } from "@clerk/nextjs";
import { LoadingIcon } from "@/components/ui/loading-icon";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

export default function ProviderDashboardPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded)
    return (
      <ContentLayout title="Loading...">
        <LoadingIcon />
      </ContentLayout>
    );
  if (!isSignedIn) return null;
  return (
    <ContentLayout title="Dashboard">
      <div className="flex flex-col space-y-8">
        <section className="flex gap-2">
          <Badge variant="destructive">Provider</Badge>
          <Badge variant="secondary">
            {user.primaryPhoneNumber?.phoneNumber}
          </Badge>
        </section>
        <section className="flex flex-col space-y-4">
          <span className="text-4xl font-light">Availability</span>
          <Availability />
        </section>
      </div>
    </ContentLayout>
  );
}

export function Availability() {
  return (
    <div>
      <section>
        <section className="flex gap-2 items-center">
          <Switch checked={true} onCheckedChange={() => {}} />
          <Badge variant="secondary">Currently Active</Badge>
        </section>
      </section>
    </div>
  );
}
