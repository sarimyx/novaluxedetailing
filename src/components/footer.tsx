import { Identity } from "@/constants/identity";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import { CarFront, Facebook, StarIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-6 md:py-0 border-t border-border/40">
      <div className="text-sm container flex flex-col items-center justify-center gap-4 md:h-24">
        <p className="text-balance text-center leading-loose text-muted-foreground">
          Copyright © {new Date().getFullYear()} {Identity.companyName}.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <a href="#pricing" className="link flex items-center gap-1">
            <CarFront className="w-4 h-4" />
            Services
          </a>
          <a
            href={Identity.socialMedia.instagram}
            target="_blank"
            className="link flex items-center gap-1"
          >
            <InstagramLogoIcon className="w-4 h-4" />
            Instagram
          </a>
          <a
            href={Identity.socialMedia.facebook}
            target="_blank"
            className="link flex items-center gap-1"
          >
            <Facebook className="w-4 h-4" />
            Facebook
          </a>
          <a
            href={Identity.googleLink}
            target="_blank"
            className="link flex items-center gap-1"
          >
            <StarIcon className="w-4 h-4" />
            Reviews
          </a>
        </div>
      </div>
    </footer>
  );
}
