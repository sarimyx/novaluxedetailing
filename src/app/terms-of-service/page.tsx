import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Styling } from "@/constants/styling";
import { Identity } from "@/constants/identity";

export default function TermsPage() {
  return (
    <ContentLayout title="Terms of Service" hideSidebar>
      <div>
        <section>
          <h1 className={`text-4xl font-bold ${Styling.GoldChromatic} mb-6`}>
            Terms of Service
          </h1>

          <div className="prose prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using {Identity.companyName}&apos;s services,
                you agree to be bound by these Terms of Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                2. Service Description
              </h2>
              <p>
                {Identity.companyName} provides mobile automotive detailing
                services. We reserve the right to refuse service to anyone for
                any reason at any time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                3. Booking and Cancellation
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Appointments must be cancelled at least 24 hours in advance
                </li>
                <li>Late cancellations may incur a fee</li>
                <li>No-shows will be charged the full service amount</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                4. Service Guarantee
              </h2>
              <p>
                We strive to provide the highest quality service. If you&apos;re
                not satisfied with our work, please contact us within 24 hours
                of service completion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Liability</h2>
              <p>
                While we take utmost care with your vehicle, we are not liable
                for any pre-existing damage or conditions.
              </p>
            </section>
          </div>
        </section>
      </div>
    </ContentLayout>
  );
}
