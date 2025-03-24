import { Styling } from "@/constants/styling";
import { Button } from "./ui/button";
import { Identity } from "@/constants/identity";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { CheckCircle2, CircleDollarSign, Clock, Star } from "lucide-react";
import Link from "next/link";
import { MiscUtils } from "@/utils/misc";
import { supabaseServerClient } from "@/utils/supabase-client-server";

const sectionStyle =
  "flex flex-col p-4 bg-slate-100 dark:bg-slate-900 rounded-lg md:h-max lg:w-60 mb-8 justify-between";
const serviceHeadingStyle = "md:text-2xl text-3xl font-bold truncate";
const priceLabelStyle = `text-4xl font-bold ${Styling.GoldChromatic}`;

export default async function Pricing() {
  const db = await supabaseServerClient();
  const { data: services } = await db.from("Services").select("*");

  if (!services) return <p>Failed to load services.</p>;

  // Group services by type (interior, exterior, etc.)
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

  // Define tab order (others will default after these)
  const order: Record<string, number> = { interior: 0, exterior: 1 };

  // Get unique service types and sort them
  const serviceTypes = Object.keys(groupedServices).sort(
    (a, b) => (order[a] ?? 2) - (order[b] ?? 2),
  );

  return (
    <div id="pricing">
      <h1
        className={`text-4xl font-bold text-center mb-4 ${Styling.GoldChromatic}`}
      >
        Choose Your Service
      </h1>

      <Tabs
        defaultValue={serviceTypes[0]}
        className="justify-center items-center text-center"
      >
        <TabsList className="mb-4">
          {serviceTypes.map((type) => {
            const isDisabled = groupedServices[type].every((s) => !s.active);
            return (
              <TabsTrigger key={type} value={type} disabled={isDisabled}>
                {MiscUtils.capitalizeString(type)}{" "}
                {isDisabled && "(coming soon)"}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {serviceTypes.map((type) => {
          // Find the max number of features in this service type
          const maxFeatures = Math.max(
            ...groupedServices[type].map((s) => s.features.split(", ").length),
          );

          return (
            <TabsContent key={type} value={type}>
              <div className="md:flex md:space-x-4 md:gap-4 justify-center text-center">
                {groupedServices[type].map(
                  ({ id, name, duration, features, price, active }) => {
                    const featureList = features.split(", ");
                    const emptySlots = maxFeatures - featureList.length;

                    return (
                      <section key={id} className={sectionStyle}>
                        <div>
                          <h1 className={serviceHeadingStyle}>
                            <span className={`font-bold`}>
                              {name.split(" ")[0]}
                            </span>{" "}
                            <span className="font-extralight">
                              {name.split(" ").slice(1).join(" ")}
                            </span>
                          </h1>
                          <hr className="hidden md:block my-1" />
                        </div>

                        <div className="flex flex-col justify-center items-center text-slate-400 text-md mb-2">
                          <div className="flex gap-2 text-xs my-2">
                            <div className="flex p-1 items-center rounded-lg bg-slate-200 dark:bg-slate-700 dark:text-primary">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{duration}</span>
                            </div>
                            {/* Popular label */}
                            {name === "Premium Interior" && (
                              <div className="flex p-1 items-center rounded-lg bg-orange-200 dark:bg-orange-700 font-bold text-primary">
                                <Star className="h-4 w-4 mr-1" />
                                <span>Popular</span>
                              </div>
                            )}
                            {/* Best Value Label */}
                            {name === "Full Interior" && (
                              <div className="flex p-1 items-center rounded-lg bg-orange-200 dark:bg-orange-700 font-bold text-primary">
                                <CircleDollarSign className="h-4 w-4 mr-1" />
                                <span>Best value</span>
                              </div>
                            )}
                          </div>

                          {/* Features List */}
                          {featureList.map((feature) => (
                            <div
                              key={feature}
                              className="flex items-center mb-2"
                            >
                              <CheckCircle2
                                className={`h-4 w-4 mr-1${feature.includes("Everything") ? " text-yellow-500" : ""}`}
                              />
                              <span
                                className={`${feature.includes("Everything") ? "font-bold text-yellow-500" : ""}`}
                              >
                                {feature}
                              </span>
                            </div>
                          ))}

                          {/* Empty placeholders to maintain alignment */}
                          {emptySlots > 0 && (
                            <div className="hidden md:block">
                              {Array.from({ length: emptySlots }).map(
                                (_, index) => (
                                  <div
                                    key={`empty-${index}`}
                                    className="h-6 mb-2"
                                  ></div>
                                ),
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col space-y-4">
                          <div className="flex flex-col">
                            <span className={priceLabelStyle}>${price}</span>
                          </div>
                          <Button
                            variant="outline"
                            size="lg"
                            asChild
                            className={`rounded-lg text-lg my-4 md:my-0 mx-20 md:mx-0 ${
                              !active ? "bg-slate-200 dark:bg-slate-700" : ""
                            }`}
                            disabled={!active}
                          >
                            {active ? (
                              <Link href={`/bookings/checkout/${id}`}>
                                Select
                              </Link>
                            ) : (
                              <span>Coming soon</span>
                            )}
                          </Button>
                        </div>
                      </section>
                    );
                  },
                )}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>

      <section className="flex flex-col space-y-2 justify-center items-center text-center">
        <span className="font-light text-sm text-slate-500">
          †Excluding taxes. Prices do not reflect any special offers, bundle
          services, or add-ons that may be applicable.
          <a href={`tel:${Identity.companyPhoneNumber}`} className="link">
            {" "}
            Call us{" "}
          </a>{" "}
          for more price information.
        </span>
        <span className="font-light text-sm text-slate-500">
          †Time estimates may vary depending on vehicle condition, size, and
          location.
        </span>
      </section>
    </div>
  );
}
