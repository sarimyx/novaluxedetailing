import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Styling } from "@/constants/styling";
import { Identity } from "@/constants/identity";

export default function PrivacyPage() {
  return (
    <ContentLayout title="Privacy Policy" hideSidebar>
      <div>
        <section>
          <h1 className={`text-4xl font-bold ${Styling.GoldChromatic} mb-6`}>
            Privacy Policy
          </h1>

          <div className="prose prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                1. Information We Collect
              </h2>
              <p>
                We collect information you provide when booking our services,
                including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name and contact information</li>
                <li>Vehicle details</li>
                <li>Service location</li>
                <li>Payment information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                2. How We Use Your Information
              </h2>
              <p>Your information is used to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process your bookings</li>
                <li>Communicate about services</li>
                <li>Improve our service quality</li>
                <li>Send promotional materials (with consent)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your
                personal information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal data</li>
                <li>Request data correction</li>
                <li>Opt out of marketing communications</li>
                <li>Request data deletion</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Contact Us</h2>
              <p>
                For privacy-related inquiries, please contact us at{" "}
                {Identity.companyEmail}.
              </p>
            </section>
          </div>
        </section>
      </div>
    </ContentLayout>
  );
}
