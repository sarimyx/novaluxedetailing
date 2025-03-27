import { Fonts } from "@/constants/fonts";
import { Styling } from "@/constants/styling";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Button } from "./ui/button";

export default function Gallery() {
  return (
    <section id="gallery" className={`mx-12 ${Fonts.premium.className}`}>
      <h1
        className={`text-5xl md:text-6xl font-semibold text-center mb-8 pb-2 tracking-tight ${Styling.GoldChromatic}`}
      >
        Our Gallery
      </h1>

      <Carousel className="w-full max-w-5xl mx-auto">
        <CarouselContent className="flex gap-6">
          {["1", "2", "3", "4"].map((id) => (
            <CarouselItem
              key={`gallery-${id}`}
              className="min-w-[80%] md:min-w-[40%] lg:min-w-[30%] transition-all duration-500 hover:scale-105"
            >
              <Card className="shadow-xl border-none overflow-hidden rounded-2xl">
                <CardContent className="p-0">
                  <Image
                    src={`/gallery/${id}.png`}
                    alt={`Gallery image ${id}`}
                    width={1280}
                    height={720}
                    className="object-cover rounded-2xl"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center gap-4">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
      <div className="flex items-center justify-center mt-4">
        <a href="#pricing">
          <Button variant="special" size="lg">Book now</Button>
        </a>
      </div>
    </section>
  );
}
