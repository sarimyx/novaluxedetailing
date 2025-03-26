import { supabaseServerClient } from "@/utils/supabase-client-server";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { GoogleConversionLink } from "@/components/ui/google-conversion-link";
import { Clock, CheckCircle2, Star } from "lucide-react";
import { Identity } from "@/constants/identity";
import { Styling } from "@/constants/styling";
import { Fonts } from "@/constants/fonts";

export default async function Pricing() {
  const db = await supabaseServerClient();
  const { data: services } = await db.from("Services").select("*");

  if (!services) return <p>Unable to load services at this time.</p>;

  const groupedServices = services
    .sort((a, b) => a.price - b.price)
    .reduce(
      (acc, service) => {
        if (!acc[service.type]) acc[service.type] = [];
        acc[service.type].push(service);
        return acc;
      },
      {} as Record<string, typeof services>,
    );

  const order: Record<string, number> = { interior: 0, exterior: 1 };
  const serviceTypes = Object.keys(groupedServices).sort(
    (a, b) => (order[a] ?? 2) - (order[b] ?? 2),
  );

  return (
    <div id="pricing" className={`px-8 ${Fonts.premium.className}`}>
      <h1
        className={`text-5xl font-semibold text-center mb-10 tracking-tight ${Styling.GoldChromatic}`}
      >
        Choose Your Service
      </h1>

      <Tabs defaultValue={serviceTypes[0]} className="w-full max-w-6xl mx-auto">
        <div className="flex justify-center">
          <TabsList className="flex justify-center gap-4 mb-2">
            {serviceTypes.map((type) => {
              const isDisabled = groupedServices[type].every((s) => !s.active);
              return (
                <TabsTrigger
                  key={type}
                  value={type}
                  disabled={isDisabled}
                  className="uppercase text-sm tracking-wide text-xs font-light"
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                  {isDisabled && " (coming soon)"}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>

        {serviceTypes.map((type) => {
          const maxFeatures = Math.max(
            ...groupedServices[type].map((s) => s.features.split(", ").length),
          );

          return (
            <TabsContent
              key={type}
              value={type}
              className="flex flex-wrap justify-center gap-8"
            >
              {groupedServices[type].map(
                ({
                  id,
                  name,
                  duration,
                  features,
                  price,
                  active,
                  recommendation,
                }) => {
                  const featureList = features.split(", ");
                  const emptySlots = maxFeatures - featureList.length;

                  return (
                    <div
                      key={id}
                      className="bg-gray-900 shadow-lg rounded-2xl p-6 w-full md:w-[300px] flex flex-col justify-between"
                    >
                      <div>
                        <h2
                          className={`text-4xl md:text-3xl font-bold mb-1 items-center ${Styling.GoldChromatic}`}
                        >
                          {name.split(" ")[0]}
                          <span className="font-light text-secondary-foreground pl-2">
                            {name.split(" ")[1]}
                          </span>
                        </h2>
                        <div className="flex gap-2 mb-2 mt-4">
                          <div className="flex items-center text-sm bg-gray-100 dark:bg-gray-700 text-secondary-foreground px-2 py-1 rounded">
                            <Clock className="w-4 h-4 mr-1" />
                            {duration}
                          </div>
                          {name.includes("Premium") && (
                            <div className="flex text-secondary items-center text-sm bg-yellow-200 dark:bg-yellow-700 font-semibold px-2 py-1 rounded">
                              <Star className="w-4 h-4 mr-1" /> Popular
                            </div>
                          )}
                        </div>
                        {recommendation && (
                          <div
                            className={`flex md:text-lg text-xl text-secondary-foreground pt-2 font-semibold ${Fonts.default.className}`}
                          >
                            {recommendation}
                          </div>
                        )}
                        <ul className="mt-4 mb-6 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                          {featureList.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-start gap-2"
                            >
                              <CheckCircle2
                                className={`w-4 h-4 mt-1 flex-shrink-0 ${
                                  feature.includes("Everything")
                                    ? "text-yellow-500"
                                    : "text-green-500"
                                }`}
                              />
                              <span
                                className={`text-lg leading-snug ${
                                  feature.includes("Everything")
                                    ? "font-medium text-yellow-500"
                                    : ""
                                }`}
                              >
                                {feature}
                              </span>
                            </li>
                          ))}
                          <div className="hidden md:block">
                            {[...Array(emptySlots)].map((_, idx) => (
                              <li key={`empty-${idx}`} className="invisible">
                                placeholder
                              </li>
                            ))}
                          </div>
                        </ul>
                      </div>

                      <div className="flex flex-col md:items-center">
                        <div
                          className={`text-3xl font-bold mb-4 ${Styling.GoldChromatic}`}
                        >
                          ${price}
                        </div>
                        <Button
                          variant="outline"
                          size="lg"
                          disabled={!active}
                          className="w-full"
                          asChild
                        >
                          {active ? (
                            <GoogleConversionLink
                              href={`/bookings/checkout/${encodeURIComponent(name)}`}
                            >
                              Select Package
                            </GoogleConversionLink>
                          ) : (
                            <span>Coming Soon</span>
                          )}
                        </Button>
                      </div>
                    </div>
                  );
                },
              )}
            </TabsContent>
          );
        })}
      </Tabs>

      <div
        className={`text-center mt-10 text-sm text-gray-500 dark:text-gray-400 space-y-2 font-light text-sm text-slate-500 ${Fonts.default.className}`}
      >
        <p>
          †Excluding taxes. Prices do not reflect any special offers or add-ons
          that may be applicable.
          <a href={`tel:${Identity.companyPhoneNumber}`} className="link">
            {" "}
            Call us{" "}
          </a>{" "}
          for more price information.
        </p>
        <p>† Time estimates may vary based on vehicle size and condition.</p>
      </div>
    </div>
  );
}
