import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Identity } from "@/constants/identity";
import { Styling } from "@/constants/styling";

export default function Page() {
  return (
    <ContentLayout title="Thank you" hideSidebar>
      <div className="flex flex-col space-y-4">
        <span className={`text-6xl font-bold ${Styling.GoldChromatic}`}>
          Thank you.
        </span>
        <span className="text-lg font-light text-secondary-foreground">
          We got your request. We will get back to you shortly. If you have any
          questions, text or call us at{" "}
          <a href={`tel:${Identity.companyPhoneNumber}`} className="link">
            {Identity.companyPhoneNumberFormatted}
          </a>
          .
        </span>
        <div className="flex flex-col">
          <a href="/">
            <Button className="mt-2 w-fit">Home page</Button>
          </a>
        </div>
      </div>
    </ContentLayout>
  );
}
