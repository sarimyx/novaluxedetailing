import { ContentLayout } from "@/components/admin-panel/content-layout";
import BookingClientComponent from "./client";

export default async function Page(props: {
  params: Promise<{ service: string }>;
}) {
  const params = await props.params;

  return (
    <ContentLayout
      title={`Book ${params.service
        .replace(/-/g, " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")}`}
      hideSidebar
    >
      <main>
        <BookingClientComponent serviceId={params.service} />
      </main>
    </ContentLayout>
  );
}
