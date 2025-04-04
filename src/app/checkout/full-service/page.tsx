import { ContentLayout } from "@/components/admin-panel/content-layout";
import ServiceRequestForm from "../service-request-form";

export default async function Page() {
  return (
    <ContentLayout title="Bookings" hideSidebar>
      <ServiceRequestForm forServiceId="full-service" />
    </ContentLayout>
  );
}
