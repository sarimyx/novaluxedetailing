"use client";

import { Button } from "@/components/ui/button";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import { Fonts } from "@/constants/fonts";
import { Database } from "@/types/generated/database.types";
import { useSupabaseClient } from "@/utils/supabase-client";
import { useEffect, useState } from "react";
import { CheckCircle2, CheckCircleIcon } from "lucide-react";
import LoadingSkeleton from "@/components/ui/loading-skeleton";
import { MiscUtils } from "@/utils/misc";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  startOfWeek,
  format,
  parseISO,
  isThisWeek,
  addWeeks,
  isSameWeek,
} from "date-fns";
import { useRouter } from "next/navigation";
import { AddressAutocomplete } from "@/components/ui/address-autocomplete";

export default function BookingClientComponent({
  serviceId,
}: {
  serviceId: string;
}) {
  const db = useSupabaseClient();

  const [isLoading, setIsLoading] = useState(true);
  const [service, setService] = useState<
    Database["public"]["Tables"]["Services"]["Row"] | null
  >(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDay, setSelectedDay] = useState<{
    year: number;
    month: number;
    day: number;
  } | null>(null);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [availableSlots, setAvailableSlots] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [serviceRes, slotsRes] = await Promise.all([
          db.from("Services").select("*").eq("service_id", serviceId).single(),
          fetch("/api/get-available-slots").then((res) => res.json()),
        ]);

        if (serviceRes.error) {
          console.error("Error fetching service:", serviceRes.error);
        }

        setService(serviceRes.data || null);
        setAvailableSlots(slotsRes || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      {isLoading && (
        <div className="space-y-2">
          <h1 className="text-lg tracking-widest font-light text-secondary-foreground animate-pulse">
            CHECKING AVAILABLE DATES
          </h1>
          <LoadingSkeleton />
        </div>
      )}

      {!isLoading && !service && (
        <div>
          <p>Service &quot;{serviceId}&quot; not found</p>
        </div>
      )}

      {!isLoading && service && (
        <div className="space-y-4">
          <section>
            <div className="flex flex-wrap gap-2">
              <Image
                src="/branding-kit/logo-wheel-transparent.png"
                alt="Nova Luxe Logo"
                className="rounded-lg object-cover hidden md:block"
                width={30}
                height={30}
              />
              <h1 className={`text-3xl uppercase ${Fonts.premium.className}`}>
                {service.name}
              </h1>
            </div>
          </section>

          <section className="md:w-4/6">
            <Stepper value={currentStep} className="items-start gap-4">
              {[
                { step: 1, title: "Choose Day" },
                { step: 2, title: "Choose Time" },
                { step: 3, title: "Confirm" },
              ].map(({ step, title }) => (
                <StepperItem key={step} step={step} className="flex-1">
                  <StepperTrigger
                    className="w-full flex-col items-start gap-2 rounded"
                    onClick={() => {
                      if (step <= currentStep) {
                        setCurrentStep(step);
                      }
                      if (currentStep === 3 && step === 2) {
                        setSelectedHour(null);
                      }
                      if (currentStep === 3 && step === 1) {
                        setSelectedDay(null);
                        setSelectedHour(null);
                      }
                      if (currentStep === 2 && step === 1) {
                        setSelectedHour(null);
                        setSelectedDay(null);
                      }
                    }}
                  >
                    <StepperIndicator asChild className="bg-border h-1 w-full">
                      <span className="sr-only">{step}</span>
                    </StepperIndicator>
                    <div className="space-y-0.5">
                      <StepperTitle className="flex items-center gap-1 hover:underline">
                        <CheckCircle2
                          className={`h-4 w-4${currentStep === step ? "" : " opacity=50"}`}
                          color="orange"
                        />
                        <p
                          className={`text-left ${currentStep === step ? "font-bold" : "opacity-50"}`}
                        >
                          {title}
                        </p>
                      </StepperTitle>
                    </div>
                  </StepperTrigger>
                </StepperItem>
              ))}
            </Stepper>
          </section>

          <section>
            {currentStep === 1 && (
              <BookingStepOne
                setCurrentStep={setCurrentStep}
                setSelectedDay={setSelectedDay}
                availableSlots={availableSlots}
              />
            )}
            {currentStep === 2 && selectedDay && (
              <BookingStepTwo
                setCurrentStep={setCurrentStep}
                setSelectedHour={setSelectedHour}
                selectedDay={selectedDay}
                availableSlots={availableSlots}
              />
            )}
          </section>

          {currentStep === 3 && selectedDay && selectedHour && (
            <section className="md:w-4/6 space-y-2">
              <hr />
              <h2 className="text-lg tracking-widest font-light text-secondary-foreground">
                CONFIRM BOOKING
              </h2>
              <div className="flex font-light gap-2 items-center ">
                <CheckCircleIcon className="h-4 w-4" />
                <p>{MiscUtils.parseDateObject(selectedDay).readableDate}</p>
                <p>•</p>
                <p>{MiscUtils.parseHour(selectedHour)}</p>
                <p>•</p>
                <p
                  className="text-yellow-500 hover:text-yellow-600 underline cursor-pointer"
                  onClick={() => {
                    setCurrentStep(1);
                    setSelectedHour(null);
                    setSelectedDay(null);
                  }}
                >
                  Change
                </p>
              </div>
              {currentStep === 3 && (
                <BookingStepThree
                  selectedDay={selectedDay}
                  selectedHour={selectedHour}
                  service={service}
                />
              )}
            </section>
          )}
        </div>
      )}
    </main>
  );
}

export function BookingStepOne({
  setCurrentStep,
  setSelectedDay,
  availableSlots,
}: {
  setCurrentStep: (step: number) => void;
  setSelectedDay: (
    step: { year: number; month: number; day: number } | null,
  ) => void;
  availableSlots: any[];
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const validDays = availableSlots
    .filter((slot) => {
      const hasAvailableHours = Object.values(slot.availableHours).some(
        (v) => v !== null,
      );
      const slotDate = new Date(slot.date);
      slotDate.setHours(0, 0, 0, 0);
      return hasAvailableHours && slotDate >= today;
    })
    .map((slot) => {
      const [year, month, day] = slot.date.split("-").map(Number);
      return { year, month, day, date: slot.date };
    });

  // Build weeks for THIS WEEK and NEXT WEEK (even if empty)
  const getWeekKey = (date: Date) =>
    format(startOfWeek(date, { weekStartsOn: 0 }), "yyyy-MM-dd");

  const thisWeekKey = getWeekKey(today);
  const nextWeekKey = getWeekKey(addWeeks(today, 1));

  const grouped: { [key: string]: { label: string; days: typeof validDays } } =
    {
      [thisWeekKey]: { label: "THIS WEEK", days: [] },
      [nextWeekKey]: { label: "NEXT WEEK", days: [] },
    };

  validDays.forEach((day) => {
    const key = getWeekKey(parseISO(day.date));
    if (!grouped[key]) {
      grouped[key] = { label: "LATER", days: [] };
    }
    grouped[key].days.push(day);
  });

  const weeks = Object.entries(grouped);

  return (
    <div className="space-y-8">
      {weeks.map(([weekKey, { label, days }]) => (
        <div key={weekKey} className="space-y-2">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            {label}
          </p>

          {days.length === 0 ? (
            <Button variant="special" className="text-secondary" disabled>
              Fully Booked
            </Button>
          ) : (
            <div className="flex gap-2 flex-wrap">
              {days.map((day) => (
                <Button
                  key={`${day.year}-${day.month}-${day.day}`}
                  variant="special"
                  onClick={() => {
                    setSelectedDay({
                      year: day.year,
                      month: day.month,
                      day: day.day,
                    });
                    setCurrentStep(2);
                  }}
                >
                  {
                    MiscUtils.parseDateObject({
                      year: day.year,
                      month: day.month,
                      day: day.day,
                    }).readableDate
                  }
                </Button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function BookingStepTwo({
  setCurrentStep,
  setSelectedHour,
  selectedDay,
  availableSlots,
}: {
  setCurrentStep: (step: number) => void;
  setSelectedHour: (hour: number | null) => void;
  selectedDay: { year: number; month: number; day: number };
  availableSlots: any[];
}) {
  if (!selectedDay) return null;

  const dateString = `${selectedDay.year}-${String(selectedDay.month).padStart(2, "0")}-${String(selectedDay.day).padStart(2, "0")}`;

  const selectedDaySlots = availableSlots.find(
    (slot) => slot.date === dateString,
  );

  const availableHours = selectedDaySlots
    ? Object.entries(selectedDaySlots.availableHours)
        .filter(([hour, detailer]) => detailer !== null)
        .map(([hour]) => parseInt(hour))
    : [];

  const morningHours = availableHours.filter((hour) => hour >= 8 && hour <= 11);
  const afternoonHours = availableHours.filter((hour) => hour >= 12);

  return (
    <div className="space-y-4">
      {/* Morning block */}
      <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
        AVAILABLE TIMES FOR{" "}
        {MiscUtils.parseDateObject(selectedDay).readableDate}
      </p>
      {morningHours.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            MORNING
          </p>
          <div className="flex gap-2 flex-wrap">
            {morningHours.map((hour) => (
              <Button
                key={hour}
                variant="special"
                onClick={() => {
                  setSelectedHour(hour);
                  setCurrentStep(3);
                }}
              >
                {MiscUtils.parseHour(hour)}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Afternoon block */}
      {afternoonHours.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            AFTERNOON
          </p>
          <div className="flex gap-2 flex-wrap">
            {afternoonHours.map((hour) => (
              <Button
                key={hour}
                variant="special"
                onClick={() => {
                  setSelectedHour(hour);
                  setCurrentStep(3);
                }}
              >
                {MiscUtils.parseHour(hour)}
              </Button>
            ))}
          </div>
        </div>
      )}
      <hr />
      <button
        onClick={() => {
          setCurrentStep(1);
          setSelectedHour(null);
        }}
      >
        <p className="text-sm text-yellow-500 hover:underline">
          ← Choose another day
        </p>
      </button>
    </div>
  );
}

export function BookingStepThree({
  selectedDay,
  selectedHour,
  service,
}: {
  selectedDay: { year: number; month: number; day: number };
  selectedHour: number;
  service: Database["public"]["Tables"]["Services"]["Row"];
}) {
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [vehicleType, setVehicleType] = useState("standard");
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    if (!name || !address || !phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in name, address, and phone number.",
      });
      return;
    }

    setSubmitting(true);

    try {
      const selectedDate = `${selectedDay.year}-${String(selectedDay.month).padStart(2, "0")}-${String(selectedDay.day).padStart(2, "0")}`;

      // First check availability
      const availabilityResponse = await fetch("/api/get-available-slots");
      const latestSlots = await availabilityResponse.json();

      // Verify the slot is still available
      const daySlot = latestSlots.find(
        (slot: any) => slot.date === selectedDate,
      );
      if (!daySlot || !daySlot.availableHours[`${selectedHour}:00`]) {
        toast({
          title: "Time Unavailable",
          description:
            "Sorry! This time was just booked by someone else. Please select another time by going back.",
          variant: "destructive",
        });
        setSubmitting(false);
        return;
      }

      // If slot is available, proceed with booking submission
      const bookingResponse = await fetch("/api/submit-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          address,
          phone,
          email,
          selectedDate,
          selectedHour,
          vehicleType,
          service,
        }),
      });

      if (bookingResponse.ok) {
        toast({
          title: "Success!",
          duration: 1000,
        });

        fetch("/api/submit-discord", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            embeds: [
              {
                title: "A new booking was submitted via website",
                description: `Refer to [Master Calendar](https://discord.com/channels/1349528908050989136/1366958455423762472/1366958486256226305) for more booking details.`,
                fields: [
                  {
                    name: "Date",
                    value: `**${MiscUtils.parseDateObject(selectedDay).readableDate}**, at **${MiscUtils.parseHour(selectedHour)}**`,
                    inline: true,
                  },
                  {
                    name: "Name",
                    value: name,
                    inline: true,
                  },
                  {
                    name: "Phone",
                    value: phone,
                    inline: true,
                  },
                  {
                    name: "Address",
                    value: address,
                    inline: true,
                  },
                  {
                    name: "Service",
                    value: `**${service.name}**`,
                    inline: true,
                  },
                ],
                thumbnail: {
                  url: `https://novaluxedetailing.com/branding-kit/logo-wheel.png`,
                },
              },
            ],
          }),
        });

        // Pass booking details through router.push
        router.push(
          `/book/thank-you?name=${encodeURIComponent(name.split(" ")[0])}&date=${encodeURIComponent(selectedDate)}&time=${encodeURIComponent(selectedHour)}&service=${encodeURIComponent(service.name)}`,
        );

        setName("");
        setAddress("");
        setPhone("");

        setEmail("");
        setVehicleType("standard");
      } else {
        toast({
          title: "Booking Failed",
          description: "There was a problem. Please try again later.",
        });
      }
    } catch (error) {
      console.error("Booking error", error);
      toast({
        title: "Booking Failed",
        description: "There was a technical issue. Please try again later.",
      });
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="flex flex-col space-y-4 md:w-4/6 w-6/6">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full Name"
        type="text"
        className="p-2 rounded-lg bg-slate-900"
      />
      <AddressAutocomplete
        value={address}
        onChange={setAddress}
        placeholder="Address"
      />
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
        type="tel"
        className="p-2 rounded-lg bg-slate-900"
      />
      <div className="space-y-1 bg-slate-900 p-2 rounded-lg">
        <p className="text-secondary-foreground">Vehicle</p>
        <RadioGroup
          value={vehicleType}
          onValueChange={(value) => setVehicleType(value)}
          className="flex flex-wrap gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="standard" id="standard" />
            <Label htmlFor="standard">Standard</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="large" id="large" />
            <Label htmlFor="large">Truck/Van/SUV/Luxury</Label>
          </div>
        </RadioGroup>
      </div>

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email (optional)"
        type="email"
        className="p-2 rounded-lg bg-slate-900"
      />

      <Button onClick={handleSubmit} disabled={submitting}>
        {submitting ? "Submitting..." : "Submit"}
      </Button>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        By submitting, you agree to our{" "}
        <a
          href="/terms-of-service"
          target="_blank"
          rel="noreferrer"
          className="text-blue-500"
        >
          Terms of Service
        </a>{" "}
        and{" "}
        <a
          href="/privacy-policy"
          target="_blank"
          rel="noreferrer"
          className="text-blue-500"
        >
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}
