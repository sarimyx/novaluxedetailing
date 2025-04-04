"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Fonts } from "@/constants/fonts";
import { Identity } from "@/constants/identity";
import { Styling } from "@/constants/styling";
import { ArrowUpRight } from "lucide-react";
import { supabaseBrowserClient } from "@/utils/supabase-client-browser";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function ServiceRequestForm({
  forServiceId,
}: {
  forServiceId: string;
}) {
  const router = useRouter();
  const lastSubmitRef = useRef<number | null>(null); // basic rate-limit guard

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    vehicleType: "sedan",
    contactPreference: "morning",
    company: "", // Honeypot field
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (formData.company !== "") return "Spam detected.";

    if (formData.name.trim().length < 2) return "Please enter your full name.";
    if (!/^\+?\d{7,15}$/.test(formData.phone.trim()))
      return "Enter a valid phone number.";
    if (formData.address.trim().length < 5)
      return "Please enter a valid address.";
    if (formData.vehicleType.trim().length < 3)
      return "Please enter a valid car make and model.";

    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const now = Date.now();
    if (lastSubmitRef.current && now - lastSubmitRef.current < 5000) {
      setError("Please wait a few seconds before resubmitting.");
      return;
    }

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    lastSubmitRef.current = now;

    const db = supabaseBrowserClient();
    const { error: dbError } = await db
      .from("ServiceRequestFormSubmissions")
      .insert({
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        vehicle_type: formData.vehicleType,
        selection: forServiceId,
        contact_preference: formData.contactPreference,
      });

    if (dbError) {
      console.error(dbError);
      setError(
        "An error occurred while submitting the form. Please try again later.",
      );
      return;
    }

    // ✅ Send to Discord webhook
    try {
      await fetch("/api/submit-discord", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [
            {
              title: "New Booking Form Submission",
              color: 2895667,
              fields: [
                { name: "Name", value: formData.name },
                { name: "Phone", value: formData.phone },
                { name: "Address", value: formData.address },
                { name: "Vehicle Type", value: formData.vehicleType },
                {
                  name: "Contact Preference",
                  value: formData.contactPreference,
                },
                { name: "Service Selected", value: `**${forServiceId}**` },
              ],
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      });
    } catch (webhookErr) {
      console.error("Discord webhook failed:", webhookErr);
    }

    router.push("/checkout/thank-you");
  };

  return (
    <div className={`space-y-4 ${Fonts.premium.className}`}>
      <a href="/#pricing">
        <Button variant="outline" className="w-fit border border-secondary">
          ← Back
        </Button>
      </a>

      <section className="flex flex-col space-y-2">
        <span className={`${Styling.GoldChromatic} font-bold text-5xl pb-2`}>
          Service request form
        </span>
        <p className="text-secondary-foreground">
          One of our specialists will be in touch with you within 24 hours. Or,
          <a
            href={`tel:${Identity.companyPhoneNumber}`}
            className="link inline-flex items-center ml-1"
          >
            call us now <ArrowUpRight className="h-4 w-4 ml-1 inline" />
          </a>
          .
        </p>
      </section>

      {error && <p className="text-red-500 font-semibold">{error}</p>}

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Honeypot field - hidden */}
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="hidden"
          autoComplete="off"
        />

        <section className="md:w-4/6 space-y-2">
          <span className="text-white font-light text-sm">1. Name</span>
          <Input
            name="name"
            placeholder="Name"
            className="text-secondary-foreground w-4/6 bg-black"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </section>

        <section className="md:w-4/6 space-y-2">
          <span className="text-white font-light text-sm">
            2. What phone number can we reach you at?
          </span>
          <Input
            name="phone"
            placeholder="Phone number"
            className="text-secondary-foreground w-4/6 bg-black"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <div className="flex gap-2 text-xs">
            <span className="hidden md:block text-secondary-foreground font-light text-sm">
              Preference:
            </span>
            <RadioGroup
              defaultValue="morning"
              onValueChange={(v) => {
                setFormData((prev) => ({ ...prev, contactPreference: v }));
              }}
            >
              <div className="flex gap-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="morning" id="r1" />
                  <Label className="text-secondary-foreground" htmlFor="r1">
                    Morning (9 – 11 AM)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="afternoon" id="r2" />
                  <Label className="text-secondary-foreground" htmlFor="r2">
                    Afternoon (12 – 3 PM)
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>
        </section>

        <section className="md:w-4/6 space-y-2">
          <span className="text-white font-light text-sm">
            3. What kind of vehicle are you hoping to detail?
          </span>
          <RadioGroup
            defaultValue="sedan"
            className="flex flex-col gap-2"
            onValueChange={(v) => {
              setFormData((prev) => ({ ...prev, vehicleType: v }));
            }}
          >
            <div className="flex flex-wrap md:w-4/6 gap-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sedan" id="car-sedan" />
                <Label
                  htmlFor="car-sedan"
                  className="text-secondary-foreground"
                >
                  Sedan
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="suv" id="car-suv" />
                <Label htmlFor="car-suv" className="text-secondary-foreground">
                  SUV / Crossover
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="truck" id="car-truck" />
                <Label
                  htmlFor="car-truck"
                  className="text-secondary-foreground"
                >
                  Truck
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="minivan" id="car-minivan" />
                <Label
                  htmlFor="car-minivan"
                  className="text-secondary-foreground"
                >
                  Minivan
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="coupe" id="car-coupe" />
                <Label
                  htmlFor="car-coupe"
                  className="text-secondary-foreground"
                >
                  Coupe / Sports
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="exotic" id="car-exotic" />
                <Label
                  htmlFor="car-exotic"
                  className="text-secondary-foreground"
                >
                  Luxury / Exotic
                </Label>
              </div>
            </div>
          </RadioGroup>
        </section>

        <section className="md:w-4/6 space-y-2">
          <span className="text-white font-light text-sm">
            4. Where is the vehicle located?
          </span>
          <Textarea
            name="address"
            placeholder="Address"
            className="text-secondary-foreground md:w-4/6 bg-black"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </section>

        <section className="md:w-4/6">
          <Button type="submit">Submit</Button>
        </section>
      </form>
    </div>
  );
}
