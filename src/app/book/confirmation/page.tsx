"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { CheckCircle2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Fonts } from "@/constants/fonts";
import { Identity } from "@/constants/identity";
import Image from "next/image";

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const service = searchParams.get("service");

  return (
    <ContentLayout title="Booking Confirmed" hideSidebar>
      <div className="flex flex-col items-center justify-center space-y-6 text-center">
        <CheckCircle2 className="w-16 h-16 text-green-500" />
        <h1 className={`text-4xl ${Fonts.premium.className}`}>
          Thank you, {name}!
        </h1>
        <p className="text-xl text-muted-foreground">
          Your booking has been confirmed
        </p>

        <div className="bg-secondary/30 p-6 rounded-lg max-w-md w-full">
          <h2 className="text-lg font-semibold mb-4">Booking Details</h2>
          <div className="space-y-2 text-left">
            <p>
              <span className="text-muted-foreground">Service:</span> {service}
            </p>
            <p>
              <span className="text-muted-foreground">Date:</span> {date}
            </p>
            <p>
              <span className="text-muted-foreground">Time:</span> {time}
            </p>
            <p className="text-muted-foreground">
              Please ensure your vehicle is present at the date above and
              address you provided.
            </p>
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <Image
            src="/branding-kit/logo-wheel.png"
            alt="Nova Luxe Detailing"
            width={50}
            height={50}
            className="object-contain rounded-full"
            priority
          />
        </div>

        <p className="text-sm text-muted-foreground max-w-md">
          We will send a confirmation text within 24 hours of the scheduled
          date. If you need to make any changes, please{" "}
          <a className="link" href={`sms:${Identity.companyPhoneNumber}`}>
            contact us
          </a>
          .
        </p>
      </div>
    </ContentLayout>
  );
}
