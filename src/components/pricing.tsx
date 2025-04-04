import { Button } from "@/components/ui/button";
import { GoogleConversionLink } from "@/components/ui/google-conversion-link";
import { Clock, CheckCircle2, Star, CheckCircle } from "lucide-react";
import { Identity } from "@/constants/identity";
import { Styling } from "@/constants/styling";
import { Fonts } from "@/constants/fonts";
import { Services } from "@/constants/services";

const serviceTypes = Object.keys(Services);

export default function Pricing() {
  return (
    <div id="pricing" className={`px-8 ${Fonts.premium.className}`}>
      <h1
        className={`pb-2 text-5xl font-semibold text-center mb-10 tracking-tight ${Styling.GoldChromatic}`}
      >
        Choose Your Service
      </h1>

      <div className="w-full max-w-6xl mx-auto flex flex-wrap justify-center gap-8">
        {serviceTypes.map((type) => {
          const service = Services[type as keyof typeof Services];
          const featureList = service.features;

          return (
            <div
              key={type}
              className="bg-gray-900 shadow-lg rounded-2xl p-6 w-full md:w-[400px] flex flex-col justify-between transition-all duration-500 hover:scale-105"
            >
              <div>
                <h2
                  className={`text-4xl md:text-3xl font-bold mb-1 items-center ${Styling.GoldChromatic}`}
                >
                  {service.name.split(" ")[0]}
                  <span className="font-light text-secondary-foreground pl-2">
                    {service.name.split(" ")[1]}
                  </span>
                </h2>
                {service.recommendation && (
                  <span
                    className={`flex md:text-lg text-xl pt-2 ${Fonts.default.className} text-secondary-foreground`}
                  >
                    {service.recommendation}
                  </span>
                )}
                <div className="flex gap-2 mb-2 mt-4">
                  <div className="flex items-center text-sm bg-gray-100 dark:bg-gray-700 text-secondary-foreground px-2 py-1 rounded">
                    <Clock className="w-4 h-4 mr-1" />
                    {service.duration}
                  </div>
                  {type === "full" && (
                    <div className="flex text-secondary items-center text-sm text-black bg-gradient-to-r from-[#bfa14d] via-[#d4af37] to-[#b8860b] text-primary-foreground shadow hover:brightness-110 font-semibold px-2 py-1 rounded">
                      <Star className="w-4 h-4 mr-1" /> Popular
                    </div>
                  )}
                </div>

                <ul className="mt-4 mb-6 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  {featureList.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CheckCircle2
                        className={`w-4 h-4 mt-1 flex-shrink-0 ${feature.includes("Everything") ? "text-yellow-500" : "text-green-500"}`}
                      />
                      <span
                        className={`text-lg leading-snug ${feature.includes("Everything") ? "font-medium text-yellow-500" : ""}`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col">
                <div
                  className={`text-2xl mb-4 font-light text-secondary-foreground ${Fonts.default.className}`}
                >
                  Starting at{" "}
                  <span className={`${Styling.GoldChromatic} font-semibold`}>
                    ${service.startingPrice}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="lg"
                  disabled={!service.active}
                  className="w-full"
                  asChild
                >
                  {service.active ? (
                    <GoogleConversionLink href={`/checkout/${service.id}`}>
                      <span className="text-lg">
                        {type === "full"
                          ? "Book Full Service"
                          : "Customize Your Service →"}
                      </span>
                    </GoogleConversionLink>
                  ) : (
                    <span>Coming Soon</span>
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className={`text-center mt-10 text-sm text-gray-500 dark:text-gray-400 space-y-2 font-light text-sm text-slate-500 ${Fonts.default.className}`}
      >
        <span className="flex justify-center items-center text-center gap-1">
          <CheckCircle />
          All <span className="font-bold">first time</span> detailers get{" "}
          <span className={`${Styling.GoldChromatic} font-bold`}>10%</span> off.
        </span>
        <p>†Time estimates may vary based on vehicle size and condition.</p>
        <p>
          †Excluding taxes. Prices do not reflect any special offers or add-ons
          that may be applicable.
          <a href={`tel:${Identity.companyPhoneNumber}`} className="link">
            {" "}
            Call us{" "}
          </a>{" "}
          for more price information.
        </p>
      </div>
    </div>
  );
}
