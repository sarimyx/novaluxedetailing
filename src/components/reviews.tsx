"use client";

import { ReactGoogleReviews } from "react-google-reviews";
import "react-google-reviews/dist/index.css";
import { Button } from "@/components/ui/button";
import { Fonts } from "@/constants/fonts";
import { Identity } from "@/constants/identity";

export default function Reviews() {
  const featurableWidgetId = process.env.FEATURABLE_WIDGET_ID!; // You can use "example" for testing

  return (
    <div id="reviews" className="h-fit">
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
            Reviews
          </Button>
        </a>
      </div>
    </div>
  );
}
