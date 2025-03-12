import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Identity } from "@/constants/identity";
import Image from "next/image";
import Pricing from "@/components/pricing";
import { CarFront, PhoneCall, Star } from "lucide-react";
import { Styling } from "@/constants/styling";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="min-h-[calc(100vh-57px-97px)] flex-1">
        <div className="container relative pb-10 space-y-16 my-12">
          <section className="flex flex-col items-center space-y-4">
            <h1
              className={`text-7xl font-bold text-center ${Styling.Chromatic}`}
            >
              {Identity.companyName}
            </h1>
            <span className="text-slate-600 dark:text-slate-400 text-center text-2xl font-light text-foreground">
              Auto detailing,{" "}
              <span className="bg-yellow-500 rounded-lg px-1 text-black font-bold">
                simplified
              </span>
              . Now in Utah.
            </span>
            <br />
            <div className="flex w-full text-center justify-center">
              <Button
                variant="default"
                size="lg"
                asChild
                className="md:w-2/6 md:h-14 rounded-lg text-2xl"
              >
                <Link href="#pricing">
                  <span> Book now </span>
                </Link>
              </Button>
            </div>
            <div className="flex w-full text-center justify-center hover:text-violet-300">
              <Button variant="link" asChild>
                <Link href="#pricing" rel="noopener noreferrer">
                  <CarFront className="w-4 h-4 mr-1" />
                  Services & Pricing →
                </Link>
              </Button>
              <Button variant="link" asChild>
                <Link href="tel:+18019798457" rel="noopener noreferrer">
                  <PhoneCall className="w-4 h-4 mr-2" />
                  Call us now
                </Link>
              </Button>
              {/* <Button variant="link" asChild>
                <Link href="#reviews" rel="noopener noreferrer">
                  <Star className="w-4 h-4 mr-2" />
                  Reviews
                </Link>
              </Button> */}
            </div>
            <br />
            <div className="w-full flex justify-center">
              <Image
                src="/branding/graphic_just-on-time.png"
                width={700}
                height={700}
                alt="demo"
                priority
                className=""
              />
            </div>
          </section>
          <hr />
          <section className="space-y-4">
            <Pricing />
          </section>
          <hr />
        </div>
      </main>
      <footer className="py-6 md:py-0 border-t border-border/40">
        <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground">
            Copyright © {new Date().getFullYear()} {Identity.companyName}.
          </p>
        </div>
      </footer>
    </div>
  );
}
