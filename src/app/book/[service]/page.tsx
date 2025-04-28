import { ContentLayout } from "@/components/admin-panel/content-layout";
import { use } from "react";
import BookingClientComponent from "./client";

export default function Page({
  params,
}: {
  params: Promise<{ service: string }> & { service: string };
}) {
  const unwrappedParams = use(params);

  return (
    <ContentLayout title="Book" hideSidebar>
      <main>
        <BookingClientComponent serviceId={unwrappedParams.service} />
      </main>
    </ContentLayout>
  );
}
