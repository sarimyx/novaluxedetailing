import { ContentLayout } from "@/components/admin-panel/content-layout";
import Pricing from "@/components/pricing";

export default function BookingsPage() {
  return (
    <ContentLayout title="Bookings" hideSidebar>
      <Pricing />
    </ContentLayout>
  );
}
