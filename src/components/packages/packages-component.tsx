import { Fonts } from "@/constants/fonts";
import PackagesComponentClient from "./client";

export default function PackagesComponent() {
  return (
    <div className={`px-4 px-2 ${Fonts.default.className}`}>
      <span
        className={`text-2xl tracking-widest font-light text-secondary-foreground flex items-center justify-center`}
      >
        CHOOSE YOUR PACKAGE
      </span>
      <PackagesComponentClient />
    </div>
  );
}
