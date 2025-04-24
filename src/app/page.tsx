import Footer from "@/components/footer";
import Pricing from "@/components/pricing";
import Reviews from "@/components/reviews";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Fonts } from "@/constants/fonts";
import { Identity } from "@/constants/identity";
import { Styling } from "@/constants/styling";
import {
  ArrowDown,
  MapPin,
  MessageSquare,
  PhoneCall,
  Stars,
} from "lucide-react";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center text-center space-y-8 py-8">
      <section className="w-full h-[60vh] relative overflow-hidden -mt-8">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
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
          <span
            className={`text-7xl py-2 w-[400px] ${Styling.GoldChromatic} ${Fonts.premium.className}`}
          >
            {Identity.companyName}
          </span>

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
      <section>
        <Pricing />
      </section>
      <Separator />
      <section>
        <Reviews featurableWidgetId={process.env.FEATURABLE_WIDGET_ID!} />
      </section>
      <Separator />
      <section>
        <section className="w-full">
          <div className="relative overflow-hidden w-full">
            <div className="flex animate-infinite-scroll">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <Image
                  key={`image-${num}`}
                  src={`/showcase/slideshow-${num}.png`}
                  alt={`Luxury car detailing showcase ${num}`}
                  width={400}
                  height={400}
                  className="rounded-full shadow-2xl mx-4 w-[300px] h-[300px] md:w-[400px] md:h-[400px] object-cover"
                />
              ))}
              {/* Duplicate set for seamless loop */}
              {[1, 2, 3].map((num) => (
                <Image
                  key={`image-${num}-duplicate`}
                  src={`/showcase/slideshow-${num}.png`}
                  alt={`Luxury car detailing showcase ${num}`}
                  width={400}
                  height={400}
                  className="rounded-full shadow-2xl mx-4 w-[300px] h-[300px] md:w-[400px] md:h-[400px] object-cover"
                />
              ))}
            </div>
          </div>
        </section>
      </section>
      <Footer />
    </div>
  );
}
