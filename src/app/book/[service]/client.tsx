"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Calendar, Car, CheckCircle2, ChevronLeft } from "lucide-react";
import { useSupabaseClient } from "@/utils/supabase-client";
import { DateUtils } from "@/utils/date";
import { Fonts } from "@/constants/fonts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import LoadingSkeleton from "@/components/ui/loading-skeleton";
import { AddressAutocomplete } from "@/components/ui/address-autocomplete";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Database } from "@/types/generated/database.types";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { AvailabilitySlot } from "@/types/availability-slot";
import { CustomerDetails } from "@/types/customer-details";
import {
  getAvailability,
  verifyTimeSlotAvailability,
  submitBooking,
} from "@/utils/server/spreadsheet-management";
import { sendDiscordNotification } from "@/utils/server/send-discord-notification";
import Link from "next/link";

export default function BookingClientComponent({
  serviceId,
}: {
  serviceId: string;
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [submittingForm, setSubmittingForm] = useState(false);
  const [version, setVersion] = useState(0);

  const [service, setService] = useState<
    Database["public"]["Tables"]["Services"]["Row"] | null
  >(null);
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
  const [selectedAvailability, setSelectedAvailability] =
    useState<AvailabilitySlot | null>(null);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: "",
    phone: "",
    address: "",
    vehicle: "standard",
    email: "",
  });

  const db = useSupabaseClient();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const fnFetchService = async () =>
      await db
        .from("Services")
        .select("*")
        .eq("service_id", serviceId)
        .single();

    const fnFetchAvailability = async () => {
      const result = await getAvailability();
      return result;
    };

    const fetchData = async () => {
      try {
        const [service, availability] = await Promise.all([
          fnFetchService(),
          fnFetchAvailability(),
        ]);

        if (!service.data) return setError("Service not found");
        if (!availability) return setError("Availability not found");

        setAvailability(availability);
        setService(service.data);
      } catch (error: any) {
        console.error(error);
        setError(error?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version]);

  const handleSubmit = async () => {
    try {
      setSubmittingForm(true);
      if (!selectedAvailability || !selectedHour || !service) {
        router.refresh();
        return;
      }
      if (
        !customerDetails.name ||
        !customerDetails.address ||
        !customerDetails.phone
      ) {
        toast({
          title: "Missing Information",
          description: "Please fill in name, address, and phone number.",
          variant: "destructive",
        });
        return;
      }
      const isTimeSlotAvailable = await verifyTimeSlotAvailability({
        year: `${selectedAvailability.year}`,
        month: `${selectedAvailability.month}`,
        day: `${selectedAvailability.day}`,
        time: `${selectedHour}`,
      });
      if (!isTimeSlotAvailable) {
        toast({
          title: "Time Slot Unavailable",
          description:
            "Sorry, it just got filled! Please choose another time slot.",
          variant: "destructive",
          duration: 7000,
        });
        setCurrentStep(1);
        setVersion((v) => v + 1);
        return;
      } else {
        const booking = await submitBooking({
          year: `${selectedAvailability.year}`,
          month: `${selectedAvailability.month}`,
          day: `${selectedAvailability.day}`,
          time: `${selectedHour}`,
          serviceId: serviceId,
          customerDetails,
        });
        if (booking && booking.success && !booking.error) {
          toast({
            title: "Booking Successful",
            description: "Your booking has been submitted.",
          });

          await sendDiscordNotification({
            embeds: [
              {
                title: "A new booking was submitted via website",
                description: `Refer to Master Calendar for more booking details.`,
                fields: [
                  {
                    name: "Date",
                    value: `${selectedAvailability.weekday}, ${DateUtils.monthFromIndex(selectedAvailability.month, true)} ${selectedAvailability.day} at ${DateUtils.formatTimeLabel(selectedHour, true)}`,
                    inline: true,
                  },
                  {
                    name: "Name",
                    value: customerDetails.name,
                    inline: true,
                  },
                  {
                    name: "Phone",
                    value: customerDetails.phone,
                    inline: true,
                  },
                  {
                    name: "Address",
                    value: customerDetails.address,
                    inline: true,
                  },
                  {
                    name: "Service",
                    value: `**${service.name}**`,
                    inline: true,
                  },
                  {
                    name: "Vehicle",
                    value: customerDetails.vehicle,
                    inline: true,
                  },
                ],
                thumbnail: {
                  url: `https://novaluxedetailing.com/branding-kit/logo-wheel.png`,
                },
                footer: {
                  text: `Booking ID: ${booking.success.bookingId}`,
                },
              },
            ],
          });

          router.push(
            `/book/confirmation?name=${customerDetails.name.split(" ")[0]}&date=${selectedAvailability.weekday}, ${DateUtils.monthFromIndex(selectedAvailability.month, true)} ${selectedAvailability.day}&time=${DateUtils.formatTimeLabel(selectedHour, true)}&service=${service.name}`,
          );
        } else {
          toast({
            title: "Booking Failed",
            description: `${booking?.error || "An unknown error occurred"}`,
            variant: "destructive",
          });
        }
      }
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Booking Failed",
        description: `${error?.message || "An unknown error occurred"}`,
        variant: "destructive",
      });
    } finally {
      setSubmittingForm(false);
    }
  };

  return (
    <main>
      {loading && (
        <div className="space-y-2">
          <h1 className="text-lg tracking-widest font-light text-secondary-foreground animate-pulse">
            CHECKING AVAILABLE DATES
          </h1>
          <LoadingSkeleton />
        </div>
      )}

      {error && <p>Service &quot;{serviceId}&quot; not found</p>}

      {service && !loading && (
        <div className="space-y-4">
          <section className="space-y-2">
            <Link href="/#packages">
              <Badge>
                {" "}
                <ChevronLeft className="h-3 w-3" />{" "}
              </Badge>
            </Link>
            <div className="flex flex-wrap gap-2">
              <Image
                src="/branding-kit/logo-wheel-transparent.png"
                alt="Nova Luxe Logo"
                className="rounded-lg object-cover hidden md:block"
                width={30}
                height={30}
              />
              <h1 className={`text-2xl uppercase ${Fonts.premium.className}`}>
                {service.name}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                ~ {service.estimated_hours} hours
              </Badge>
              <Badge variant="secondary" className="flex gap-1">
                <CheckCircle2 className="h-3 w-3 text-secondary-foreground" />
                We come to you
              </Badge>
            </div>
          </section>

          <section className="lg:w-3/6">
            <Stepper value={currentStep} className="items-start gap-4">
              {[1, 2, 3].map((step) => (
                <StepperItem key={step} step={step} className="flex-1">
                  <StepperTrigger className="w-full flex-col items-start gap-2 rounded">
                    <StepperIndicator asChild className="bg-border h-1 w-full">
                      <span className="sr-only">{step}</span>
                    </StepperIndicator>
                    <div className="space-y-0.5">
                      <StepperTitle className="flex items-center gap-1">
                        <CheckCircle2
                          className={`h-4 w-4${currentStep === step ? "" : " opacity=50"}`}
                          color="orange"
                        />
                        <p
                          className={`text-left ${currentStep === step ? "font-bold" : "opacity-50"}`}
                        >
                          {["Choose Day", "Choose Time", "Confirm"][step - 1]}
                        </p>
                      </StepperTitle>
                    </div>
                  </StepperTrigger>
                </StepperItem>
              ))}
            </Stepper>
          </section>

          <section className="lg:w-3/6">
            {currentStep === 1 && (
              <div className="space-y-4">
                {/* Group availability by weeks */}
                {(() => {
                  const today = new Date();
                  const groupedByWeek: { [key: string]: AvailabilitySlot[] } =
                    {};

                  availability.forEach((slot) => {
                    const date = new Date(slot.year, slot.month - 1, slot.day);

                    let weekLabel = "LATER";
                    const diffTime = Math.ceil(
                      (date.getTime() - today.getTime()) /
                        (1000 * 60 * 60 * 24),
                    );

                    if (diffTime <= 7) {
                      weekLabel = "THIS WEEK";
                    } else if (diffTime <= 14) {
                      weekLabel = "NEXT WEEK";
                    }

                    if (!groupedByWeek[weekLabel]) {
                      groupedByWeek[weekLabel] = [];
                    }
                    groupedByWeek[weekLabel].push(slot);
                  });

                  return Object.entries(groupedByWeek).map(([label, slots]) => (
                    <div key={label} className="space-y-2">
                      <p className="text-xs font-light text-secondary-foreground">
                        {label}
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        {slots.map((a, i) => (
                          <Button
                            key={i}
                            variant="special"
                            onClick={() => {
                              setSelectedAvailability(a);
                              setCurrentStep(2);
                            }}
                          >
                            {a.weekday},{" "}
                            {DateUtils.monthFromIndex(a.month, true)} {a.day}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ));
                })()}
              </div>
            )}

            {currentStep === 2 && selectedAvailability && (
              <div className="space-y-4">
                {(() => {
                  const groupedByTime: { [key: string]: string[] } = {
                    MORNING: [],
                    AFTERNOON: [],
                  };

                  selectedAvailability.times.forEach((time) => {
                    const hour = parseInt(time.split(" ")[0]);
                    if (hour < 12) {
                      groupedByTime["MORNING"].push(time);
                    } else {
                      groupedByTime["AFTERNOON"].push(time);
                    }
                  });

                  return Object.entries(groupedByTime).map(
                    ([label, slots]) =>
                      slots.length > 0 && (
                        <div key={label} className="space-y-2">
                          <p className="text-xs font-light text-secondary-foreground">
                            {label}
                          </p>
                          <div className="flex flex-wrap items-center gap-2">
                            {slots.map((time, i) => (
                              <Button
                                key={i}
                                variant="special"
                                onClick={() => {
                                  setSelectedHour(time);
                                  setCurrentStep(3);
                                }}
                              >
                                {DateUtils.formatTimeLabel(time)}
                              </Button>
                            ))}
                          </div>
                        </div>
                      ),
                  );
                })()}
                <button
                  onClick={() => {
                    setCurrentStep(1);
                    setSelectedHour(null);
                  }}
                >
                  <p className="text-sm text-yellow-500 underline">
                    Choose another day
                  </p>
                </button>
              </div>
            )}

            {currentStep === 3 &&
              selectedAvailability &&
              selectedHour &&
              service && (
                <StepThree
                  service={service}
                  selectedAvailability={selectedAvailability}
                  selectedHour={selectedHour}
                  customerDetails={customerDetails}
                  setCustomerDetails={setCustomerDetails}
                  submittingForm={submittingForm}
                  handleSubmit={handleSubmit}
                  setCurrentStep={setCurrentStep}
                />
              )}
          </section>
        </div>
      )}
    </main>
  );
}

const StepThree = ({
  service,
  selectedAvailability,
  selectedHour,
  customerDetails,
  setCustomerDetails,
  submittingForm,
  handleSubmit,
  setCurrentStep,
}: {
  service: Database["public"]["Tables"]["Services"]["Row"];
  selectedAvailability: AvailabilitySlot;
  selectedHour: string;
  customerDetails: CustomerDetails;
  setCustomerDetails: React.Dispatch<React.SetStateAction<CustomerDetails>>;
  submittingForm: boolean;
  handleSubmit: () => Promise<void>;
  setCurrentStep: (step: number) => void;
}) => {
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  return (
    <main className="space-y-4 p-4 bg-slate-900 rounded-lg">
      <section>
        <h1 className="text-2xl tracking-widest font-light text-secondary-foreground">
          CONFIRM BOOKING
        </h1>
        <div className="flex items-center gap-1 text-sm">
          <Car className="h-4 w-4 text-orange-400" />
          <p>{service.name}</p>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <Calendar className="h-4 w-4 text-orange-400" />
          <p>
            <strong>
              {selectedAvailability.weekday},{" "}
              {DateUtils.monthFromIndex(selectedAvailability.month, true)}{" "}
              {selectedAvailability.day}
            </strong>{" "}
            at {DateUtils.formatTimeLabel(selectedHour, true)}
          </p>
          <p className="text-secondary-foreground">•</p>
          <p
            className="underline cursor-pointer hover:text-yellow-400"
            onClick={() => setCurrentStep(1)}
          >
            Change
          </p>
        </div>
      </section>
      <section className="space-y-3">
        <input
          ref={nameRef}
          value={customerDetails.name}
          onChange={(e) =>
            setCustomerDetails((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="Full name"
          type="text"
          className="p-2 rounded-lg bg-slate-800 outline-none w-full"
          autoComplete="name"
        />
        <AddressAutocomplete
          value={customerDetails.address}
          onChange={(e) =>
            setCustomerDetails((prev) => ({ ...prev, address: e }))
          }
          placeholder="Address"
          className="p-2 rounded-lg bg-slate-800 outline-none w-full"
        />
        <input
          value={customerDetails.phone}
          onChange={(e) =>
            setCustomerDetails((prev) => ({ ...prev, phone: e.target.value }))
          }
          placeholder="Phone"
          type="tel"
          className="p-2 rounded-lg bg-slate-800 outline-none w-full"
          autoComplete="tel"
        />
        <div className="space-y-1 bg-slate-800 p-2 rounded-lg w-full">
          <p className="text-secondary-foreground">Vehicle</p>
          <RadioGroup
            value={customerDetails.vehicle}
            onValueChange={(value) =>
              setCustomerDetails((prev) => ({ ...prev, vehicle: value }))
            }
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
      </section>
      <section>
        <Button
          onClick={handleSubmit}
          disabled={submittingForm}
          className="w-full"
        >
          {submittingForm ? "Submitting..." : "Submit"}
        </Button>
      </section>
    </main>
  );
};
