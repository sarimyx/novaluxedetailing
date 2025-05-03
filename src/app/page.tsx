import Footer from "@/components/footer";
import PackagesComponent from "@/components/packages/packages-component";
import ReviewsComponent from "@/components/reviews/page";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Fonts } from "@/constants/fonts";
import { Identity } from "@/constants/identity";
import { SiteMetadata } from "@/constants/metadata";
import { Styling } from "@/constants/styling";
import {
  ArrowDown,
  MapPin,
  MessageSquare,
  PhoneCall,
  Stars,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

export const metadata = SiteMetadata;

export default function Page() {
  return (
    <main className="flex flex-col justify-center items-center text-center space-y-8 py-8">
      <section
        className="w-full h-[60vh] relative overflow-hidden -mt-8"
        aria-label="Hero Section"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          aria-label="Luxury car detailing showcase video"
        >
          <source src="/videos/landing-page-video.mov" type="video/mp4" />
          <source
            src="/showcase/landing-page-video.mov"
            type="video/quicktime"
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-8">
          <h1
            className={`text-7xl py-2 text-wrap w-[400px] py-2 ${Styling.GoldChromatic} ${Fonts.premium.className}`}
          >
            {Identity.companyName}
          </h1>
          <div className="flex flex-col items-center space-y-4">
            <div className="flex">
              <Button variant="special" size="lg" className="rounded-full">
                <Link href="#packages" className="flex gap-2 items-center">
                  Book Us In 3 Clicks
                  <ArrowDown className="h-4 w-4 inline-block" />
                </Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" size="sm" className="rounded-full">
                <Link
                  href={`tel:${Identity.companyPhoneNumber}`}
                  className="flex gap-2 items-center"
                >
                  <PhoneCall className="h-4 w-4 inline-block" />
                  {Identity.companyPhoneNumberFormatted}
                </Link>
              </Button>
              <Button variant="secondary" size="sm" className="rounded-full">
                <Link
                  href={`sms:${Identity.companyPhoneNumber}`}
                  className="flex gap-2 items-center"
                >
                  <MessageSquare className="h-4 w-4 inline-block" />
                  Text Us
                </Link>
              </Button>
              <Button variant="secondary" size="sm" className="rounded-full">
                <Link href="#reviews" className="flex gap-2 items-center">
                  <Stars className="h-4 w-4 inline-block" />
                  Reviews
                </Link>
              </Button>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="text-orange-400" />
              <span
                className={`text-secondary-foreground ${Fonts.premium.className}`}
              >
                Serving{" "}
                <strong className={Styling.GoldChromatic}>
                  Utah County & Nearby Cities
                </strong>
              </span>
            </div>
          </div>
        </div>
      </section>
      <Separator id="packages" />
      <section id="pricing" aria-label="Packages">
        <h2 className="sr-only">Our Detailing Packages</h2>
        <PackagesComponent />
      </section>
      <Separator id="reviews" />
      <section aria-label="Customer Reviews">
        <h2 className="sr-only">Customer Reviews and Testimonials</h2>
        <ReviewsComponent />
      </section>
      <Separator />
      <section className="space-y-2">
        <span className="tracking-widest font-light flex items-center justify-center">
          SO WHAT ARE YOU WAITING FOR?
        </span>
        <Button variant="special" size="lg" className="rounded-full">
          <Link href="#packages" className="flex gap-2 items-center">
            Book Now
          </Link>
        </Button>
      </section>
      <Separator />
      <section aria-label="Portfolio Showcase">
        <h2 className="sr-only">Our Detailing Portfolio</h2>
        <div className="relative overflow-hidden w-full">
          <div className="flex animate-infinite-scroll">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <Image
                key={`image-${num}`}
                src={`/slideshow/slideshow-${num}.jpeg`}
                alt={`Professional car detailing result - Showcase ${num}`}
                width={400}
                height={400}
                className="rounded-full shadow-2xl mx-4 w-[300px] h-[300px] md:w-[400px] md:h-[400px] object-cover"
              />
            ))}
            {[1, 3, 5, 4, 2].map((num) => (
              <Image
                key={`slideshow-image-${num}`}
                src={`/slideshow/slideshow-${num}.jpeg`}
                alt={`Showcase ${num}`}
                width={400}
                height={400}
                className="rounded-full shadow-2xl mx-4 w-[300px] h-[300px] md:w-[400px] md:h-[400px] object-cover"
              />
            ))}
          </div>
        </div>
      </section>
      <Separator />
      <Footer />
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutoRepair",
            name: "Nova Luxe Detailing",
            image: "https://novaluxedetailing.com/branding-kit/logo-wheel.png",
            address: {
              "@type": "PostalAddress",
              addressRegion: "UT",
              addressCountry: "US",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: "40.2338",
              longitude: "-111.6585",
            },
            url: "https://novaluxedetailing.com",
            telephone: Identity.companyPhoneNumber,
            priceRange: "$$",
          }),
        }}
      />
    </main>
  );
}
