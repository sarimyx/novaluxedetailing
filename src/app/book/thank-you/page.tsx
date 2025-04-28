import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Identity } from "@/constants/identity";
import { Styling } from "@/constants/styling";

export default function Page() {
  return (
    <ContentLayout title="Thank you" hideSidebar>
      <div className="flex flex-col space-y-4 md:w-3/6">
        <span className={`text-6xl font-bold ${Styling.GoldChromatic}`}>
          Thank you.
        </span>
        <span className="text-lg font-light text-secondary-foreground">
          Your booking was received. You will receive a confirmation text within
          24 hours. If you have any questions or would like to reschedule, text
          or call us at{" "}
          <a href={`sms:${Identity.companyPhoneNumber}`} className="link">
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
