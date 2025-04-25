import Footer from "@/components/footer";
import Pricing from "@/components/pricing";
import Reviews from "@/components/reviews";
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
          <source src="/showcase/landing-page-video.mov" type="video/mp4" />
          <source
            src="/showcase/landing-page-video.mov"
            type="video/quicktime"
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-8">
          <h1
            className={`text-7xl py-2 w-[400px] ${Styling.GoldChromatic} ${Fonts.premium.className}`}
          >
            {Identity.companyName}
          </h1>

          <div className="flex flex-col items-center space-y-4">
            <div className="flex">
              <Button variant="special" size="lg" className="rounded-full">
                <a href="#services" className="flex gap-2 items-center">
                  Book Us In 3 Clicks
                  <ArrowDown className="h-4 w-4 inline-block" />
                </a>
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" size="sm" className="rounded-full">
                <a
                  href={`tel:${Identity.companyPhoneNumber}`}
                  className="flex gap-2 items-center"
                >
                  <PhoneCall className="h-4 w-4 inline-block" />
                  {Identity.companyPhoneNumberFormatted}
                </a>
              </Button>
              <Button variant="secondary" size="sm" className="rounded-full">
                <a
                  href={`sms:${Identity.companyPhoneNumber}`}
                  className="flex gap-2 items-center"
                >
                  <MessageSquare className="h-4 w-4 inline-block" />
                  Text Us
                </a>
              </Button>
              <Button variant="secondary" size="sm" className="rounded-full">
                <a href="#reviews" className="flex gap-2 items-center">
                  <Stars className="h-4 w-4 inline-block" />
                  Reviews
                </a>
              </Button>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="text-orange-400" />
              <span
                className={`text-secondary-foreground ${Fonts.premium.className}`}
              >
                Serving all of{" "}
                <strong className={Styling.GoldChromatic}>Utah County</strong>
              </span>
            </div>
          </div>
        </div>
      </section>
      <Separator />
      <section id="services" aria-label="Pricing and Services">
        <h2 className="sr-only">Our Detailing Services</h2>
        <Pricing />
      </section>
      <Separator />
      <section id="reviews" aria-label="Customer Reviews">
        <h2 className="sr-only">Customer Reviews and Testimonials</h2>
        <Reviews featurableWidgetId={process.env.FEATURABLE_WIDGET_ID!} />
      </section>
      <section aria-label="Portfolio Showcase">
        <h2 className="sr-only">Our Detailing Portfolio</h2>
        <div className="relative overflow-hidden w-full">
          <div className="flex animate-infinite-scroll">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <Image
                key={`image-${num}`}
                src={`/showcase/slideshow-${num}.png`}
                alt={`Professional car detailing result - Showcase ${num}`}
                width={400}
                height={400}
                className="rounded-full shadow-2xl mx-4 w-[300px] h-[300px] md:w-[400px] md:h-[400px] object-cover"
              />
            ))}
            {[1, 3, 5, 4, 2].map((num) => (
              <Image
                key={`slideshow-image-${num}`}
                src={`/showcase/slideshow-${num}.png`}
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
    </main>
  );
}
