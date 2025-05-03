import { Suspense } from "react";
import ReviewsClient from "./client";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Identity } from "@/constants/identity";

export default function ReviewsComponent() {
  return (
    <section className="container mx-auto px-4 space-y-4">
      <span className="tracking-widest font-light flex items-center justify-center">
        WHAT OUR CUSTOMERS SAY
      </span>
      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-secondary/30 p-6 rounded-lg">
                <div className="h-4 bg-secondary rounded w-3/4 mb-4"></div>
                <div className="h-20 bg-secondary rounded w-full"></div>
              </div>
            ))}
          </div>
        }
      >
        <ReviewsClient />
        <Link href={Identity.googleLink} target="_blank">
          <Button className="rounded-full my-4" variant="secondary">
            View more on Google <ArrowUpRight className="h-4 w-4" />
          </Button>
        </Link>
      </Suspense>
    </section>
  );
}
