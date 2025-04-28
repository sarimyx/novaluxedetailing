import { Identity } from "@/constants/identity";
import { Styling } from "@/constants/styling";
import { Fonts } from "@/constants/fonts";
import { Services } from "@/constants/services";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Pricing() {
  const serviceTypes = Object.keys(Services);

  return (
    <div id="services" className={`px-4 px-2 ${Fonts.default.className}`}>
      <span
        className={`text-2xl tracking-widest font-light text-secondary-foreground flex items-center justify-center`}
      >
        CHOOSE YOUR PACKAGE
      </span>
      <Tabs defaultValue="premium" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 my-4">
          <TabsTrigger value="premium">PREMIUM</TabsTrigger>
          <TabsTrigger value="express">EXPRESS</TabsTrigger>
        </TabsList>

        <TabsContent value="premium">
          <div className="w-full max-w-6xl mx-auto grid md:grid-cols-1 gap-8">
            {serviceTypes.map((type) => {
              const service = Services[type as keyof typeof Services];

              if (service.category === "express") return;

              return (
                <Link
                  href={service.active ? `/book/${service.id}` : "#"}
                  key={type}
                  className={`relative group overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 aspect-[16/9] ${!service.active && "pointer-events-none opacity-60"}`}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center z-0 opacity-40"
                    style={{
                      backgroundImage: `url(/showcase/package-cover-${service.id}.png)`,
                    }}
                  />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all duration-300" />

                  <div className="relative flex flex-col items-center text-center justify-center z-10 p-6 md:p-12 md:mx-8 h-full">
                    <h2
                      className={`text-3xl md:text-5xl font-bold mb-2 md:mb-4 md:pb-2 ${Styling.GoldChromatic} ${Fonts.premium.className}`}
                    >
                      {service.name}
                    </h2>

                    <p className="text-lg md:text-xl text-gray-200 mb-4 md:mb-6">
                      {service.recommendation}
                    </p>

                    <div
                      className={`tracking-widest font-light text-secondary-foreground`}
                    >
                      STARTING AT{" "}
                      <span
                        className={`${Styling.GoldChromatic} font-semibold`}
                      >
                        ${service.startingPrice}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="express">
          <div className="w-full max-w-6xl mx-auto grid md:grid-cols-1 gap-8">
            {serviceTypes.map((type) => {
              const service = Services[type as keyof typeof Services];

              if (service.category !== "express") return;

              return (
                <Link
                  href={service.active ? `/book/${service.id}` : "#"}
                  key={type}
                  className={`relative group overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 aspect-[16/9] ${!service.active && "pointer-events-none opacity-60"}`}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center z-0 opacity-40"
                    style={{
                      backgroundImage: `url(/showcase/package-cover-${service.id}.png)`,
                    }}
                  />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all duration-300" />

                  <div className="relative flex flex-col items-center text-center justify-center z-10 p-6 md:p-12 md:mx-8 h-full">
                    <h2
                      className={`text-3xl md:text-5xl font-bold mb-2 md:mb-4 md:pb-2 ${Styling.GoldChromatic} ${Fonts.premium.className}`}
                    >
                      {service.name}
                    </h2>

                    <p className="text-lg md:text-xl text-gray-200 mb-4 md:mb-6">
                      {service.recommendation}
                    </p>

                    <div
                      className={`tracking-widest font-light text-secondary-foreground`}
                    >
                      STARTING AT{" "}
                      <span
                        className={`${Styling.GoldChromatic} font-semibold`}
                      >
                        ${service.startingPrice}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>

      <div
        className={`text-center mt-10 text-sm text-gray-500 dark:text-gray-400 space-y-2 ${Fonts.default.className}`}
      >
        <p>
          <a href={`tel:${Identity.companyPhoneNumber}`} className="link">
            Call
          </a>{" "}
          or{" "}
          <a
            href={`sms:${Identity.companyPhoneNumber}?body=Hi, I'm interested in learning about your prices.`}
            className="link"
          >
            text us
          </a>{" "}
          for more information.
        </p>
      </div>
    </div>
  );
}
