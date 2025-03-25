import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Identity } from "@/constants/identity";
import { Styling } from "@/constants/styling";
import { supabaseServerClient } from "@/utils/supabase-client-server";

export default async function BookingsPage({
  params,
}: {
  params: { name: string };
}) {
  if (!params.name) return;
  const db = await supabaseServerClient();
  console.log(params.name);
  const service = await db
    .from("Services")
    .select("*")
    .eq("name", decodeURIComponent(params.name).replaceAll("-", " "))
    .single();
  if (!service.data) return;
  return (
    <ContentLayout title="Bookings" hideSidebar>
      <div className="space-y-4">
        <a href="/#pricing">
          <Button variant="outline" className="w-fit">
            ← Back
          </Button>
        </a>
        <section>
          <span className="text-slate-700 dark:text-slate-300 font-light text-sm">
            YOU SELECTED:
          </span>
          <div className={"text-5xl font-bold"}>
            <span className={Styling.GoldChromatic}>
              {service.data.name.split(" ")[0]}
            </span>{" "}
            {service.data.name.split(" ").slice(1).join(" ")}
          </div>
        </section>
        <section>
          <div className="flex flex-wrap gap-3">
            <Card className="w-fit p-2 bg-slate-200 dark:bg-slate-700">
              ${service.data.price}
            </Card>
            <Card className="w-fit p-2 bg-slate-200 dark:bg-slate-700">
              {service.data.duration}
            </Card>
          </div>
        </section>
        <section className="space-y-2">
          <span className="text-slate-700 dark:text-slate-300 font-light text-sm">
            FEATURES INCLUDE:
          </span>
          {service.data.features.split(",").map((feature) => (
            <Card
              key={feature}
              className="w-fit p-2 bg-slate-200 dark:bg-slate-700"
            >
              <span
                className={feature.includes("Everything") ? `font-bold` : ""}
              >
                {feature}
              </span>
            </Card>
          ))}
        </section>
        <hr />
        <section>
          <span className="text-slate-700 dark:text-slate-300 font-light text-lg">
            {" "}
            Book now by calling us at{" "}
            <a href={Identity.companyPhoneNumber} className="link">
              {Identity.companyPhoneNumberFormatted}
            </a>
            .{" "}
          </span>
        </section>
      </div>
    </ContentLayout>
  );
}
