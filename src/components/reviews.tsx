"use client";

import { ReactGoogleReviews } from "react-google-reviews";
import "react-google-reviews/dist/index.css";
import { Button } from "@/components/ui/button";
import { Fonts } from "@/constants/fonts";
import { Identity } from "@/constants/identity";

export default function Reviews({
  featurableWidgetId,
}: {
  featurableWidgetId: string;
}) {
  return (
    <div
      id="reviews"
      className="lg:w-fit md:w-[800px] w-[400px] items-left text-left"
    >
      <span className="tracking-widest font-light text-secondary-foreground flex items-center justify-center">
        WHAT OUR CUSTOMERS SAY
      </span>
      <ReactGoogleReviews
        theme="dark"
        layout="carousel"
        logoVariant="full"
        featurableId={featurableWidgetId}
      />
      <div
        className={`flex items-center justify-center mt-4 ${Fonts.premium.className}`}
      >
        <a href={Identity.googleLink} target="_blank">
          <Button variant="special" size="lg">
            Open in Google
          </Button>
        </a>
      </div>
    </div>
  );
}
