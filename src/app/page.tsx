import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Identity } from "@/constants/identity";
import Pricing from "@/components/pricing";
import { CarFront, Map, MapPin, MapPinned, PhoneCall } from "lucide-react";
import { Styling } from "@/constants/styling";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import { Fonts } from "@/constants/fonts";
import Gallery from "@/components/gallery";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="min-h-[calc(100vh-57px-97px)] flex-1">
        <div className="relative space-y-16">
          <section className="flex flex-col items-center space-y-4">
            <br />
            <h1
              className={`text-6xl font-bold text-center ${Styling.GoldChromatic} ${Fonts.premium.className} pb-2`}
            >
              {Identity.companyName}
            </h1>
            <div className="flex flex-col mx-4 space-y-2 text-slate-600 dark:text-slate-400 text-center text-2xl font-light text-foreground">
              <div className="flex text-center justify-center items-center">
                <span className={`font-light ${Fonts.premium.className} pb-1`}>
                  {" "}
                  Premium Interior Car Detail{" "}
                </span>
              </div>
            </div>
            <div className="flex w-full text-center justify-center">
              <Button
                variant="special"
                size="lg"
                className="md:w-3/12 md:h-14 w-3/6 h-14 rounded-lg text-2xl"
                asChild
              >
                <Link href="#pricing">
                  <span className={`${Fonts.premium.className}`}>
                    {" "}
                    Book now{" "}
                  </span>
                </Link>
              </Button>
            </div>
            <span className="dark:text-white font-light">
              (less than 3 clicks – we&apos;ll come to you!)
            </span>
            <div className="flex w-full text-center justify-center hover:text-violet-300">
              <Button variant="link" asChild>
                <Link href="#pricing" rel="noopener noreferrer">
                  <CarFront className="w-4 h-4 mr-1" />
                  Services & Pricing →
                </Link>
              </Button>
              <Button variant="link" asChild>
                <Link
                  href={`tel:+${Identity.companyPhoneNumber}`}
                  rel="noopener noreferrer"
                >
                  <PhoneCall className="w-4 h-4 mr-2" />
                  {Identity.companyPhoneNumberFormatted}
                </Link>
              </Button>
            </div>
            <div className="flex flex-col">
              <section className="flex items-center gap-1">
                <MapPin className="text-orange-400" />
                <span
                  className={`text-secondary-foreground ${Fonts.premium.className}`}
                >
                  {" "}
                  Proudly Serving{" "}
                  <strong className="dark:text-white">Utah</strong>{" "}
                </span>
              </section>
            </div>
          </section>
          <Separator />
          <section className="space-y-4 mx-4">
            <Pricing />
          </section>
          <Separator />
          <section className="space-y-4 mx-4">
            <Gallery />
          </section>
          <Separator />
          {/* Add more sections here... */}
          <hr />
        </div>
      </main>
      <footer className="py-6 md:py-0 border-t border-border/40">
        <div className="text-sm container flex flex-col items-center justify-center gap-4 md:h-24">
          <p className="text-balance text-center leading-loose text-muted-foreground">
            Copyright © {new Date().getFullYear()} {Identity.companyName}.
          </p>
          <div className="flex flex-wrap gap-2">
            <a href="/bookings" className="link flex items-center gap-1">
              <CarFront className="w-4 h-4" />
              Services
            </a>
            <a
              href={Identity.socialMedia.instagram}
              target="_blank"
              className="link flex items-center gap-1"
            >
              <InstagramLogoIcon />
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
