import { ContentLayout } from "@/components/admin-panel/content-layout";
import BookingClientComponent from "./client";
import { BookingPageProps } from "@/types/page-props";
import { Metadata, ResolvingMetadata } from "next";
import { MiscUtils } from "@/utils/misc";

export async function generateMetadata(
  { params, searchParams }: BookingPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { service } = await params;
  const readableService = MiscUtils.parseServiceId(service);

  return {
    title: `${readableService} | Nova Luxe Detailing`,
    description: `Book our ${readableService} service.`,
    openGraph: {
      title: `${readableService} | Utah's Premium Mobile Auto Detailing Service`,
      description: `Book our ${readableService} service in 3 clicks.`,
      url: `https://novaluxedetailing.com/book/packages/${service}`,
      images: [
        {
          url: `https://novaluxedetailing.com/package-covers/package-cover-${service}.jpeg`,
          width: 1200,
          height: 630,
          alt: `${readableService}`,
        },
      ],
    },
  };
}

export default async function Page(props: {
  params: Promise<{ service: string }>;
}) {
  const params = await props.params;

  return (
    <ContentLayout
      title={`Book ${MiscUtils.parseServiceId(params.service)}`}
      hideSidebar
    >
      <main>
        <BookingClientComponent serviceId={params.service} />
      </main>
    </ContentLayout>
  );
}
