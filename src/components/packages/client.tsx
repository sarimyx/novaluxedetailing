"use client";

import { Database } from "@/types/generated/database.types";
import { useClerkSupabaseClient } from "@/utils/supabase-client-v2";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Styling } from "@/constants/styling";
import { Fonts } from "@/constants/fonts";
import { LoadingIcon } from "@/components/ui/loading-icon";
import Image from "next/image";

export default function PackagesComponent() {
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<
    Database["public"]["Tables"]["Services"]["Row"][]
  >([]);
  const db = useClerkSupabaseClient();

  useEffect(() => {
    if (!loading) setLoading(true);

    const fetchServices = async () => {
      const { data, error } = await db.from("Services").select("*");
      if (error) {
        console.error(error);
      }
      setServices(
        (data || []).sort(
          (a, b) => (a.display_order || 0) - (b.display_order || 0),
        ),
      );
      setLoading(false);
    };

    fetchServices();
  }, []);

  return (
    <div>
      {loading && (
        <div className="w-full max-w-6xl mx-auto animate-pulse p-3 space-y-2">
          <div className="h-8 bg-gray-700 rounded-full" />
          <div className="relative overflow-hidden rounded-2xl aspect-[16/9]">
            <div className="absolute inset-0 bg-slate-800" />
          </div>
        </div>
      )}

      {!loading && services && (
        <Tabs defaultValue="premium" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 my-4">
            <TabsTrigger value="premium">PREMIUM</TabsTrigger>
            <TabsTrigger value="express">EXPRESS</TabsTrigger>
          </TabsList>

          <TabsContent value="premium">
            <div className="w-full max-w-6xl mx-auto grid md:grid-cols-1 gap-8">
              {services
                .filter((service) => service.category !== "express")
                .map((service, index) => (
                  <Link
                    href={service.active ? `/book/${service.service_id}` : "#"}
                    key={service.service_id}
                    className={`relative group overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 aspect-[16/9] ${!service.active && "pointer-events-none opacity-60"}`}
                  >
                    <Image
                      src={`/showcase/package-cover-${service.service_id}.jpeg`}
                      alt={service.name}
                      fill
                      priority={index === 0} // Only top image is priority
                      loading={index === 0 ? "eager" : "lazy"} // First eager, others lazy
                      className="object-cover object-center opacity-40 group-hover:opacity-50 transition-opacity duration-300 
                        saturate-50 contrast-125 brightness-75 
                        group-hover:saturate-75 group-hover:contrast-100 group-hover:brightness-90
                        transition-all duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 group-hover:bg-black/40 transition-all duration-300" />

                    <div className="relative flex flex-col items-center text-center justify-center z-10 p-6 md:p-12 md:mx-8 h-full">
                      <h2
                        className={`text-3xl md:text-5xl font-bold mb-2 md:mb-4 md:pb-2 ${Styling.GoldChromatic} ${Fonts.premium.className}`}
                      >
                        {service.name}
                      </h2>
                      <p className="text-lg md:text-xl text-gray-200 mb-4 md:mb-6">
                        {service.description}
                      </p>
                      <div className="tracking-widest font-light text-secondary-foreground">
                        STARTING AT{" "}
                        <span
                          className={`${Styling.GoldChromatic} font-semibold`}
                        >
                          ${service.starting_price}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="express">
            <div className="w-full max-w-6xl mx-auto grid md:grid-cols-1 gap-8">
              {services
                .filter((service) => service.category === "express")
                .map((service, index) => (
                  <Link
                    href={service.active ? `/book/${service.service_id}` : "#"}
                    key={service.service_id}
                    className={`relative group overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 aspect-[16/9] ${!service.active && "pointer-events-none opacity-60"}`}
                  >
                    <Image
                      src={`/showcase/package-cover-full-package.jpeg`}
                      alt={service.name}
                      fill
                      priority={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                      className="object-cover object-center opacity-40 group-hover:opacity-50 transition-opacity duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    />
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all duration-300" />

                    <div className="relative flex flex-col items-center text-center justify-center z-10 p-6 md:p-12 md:mx-8 h-full">
                      <h2
                        className={`text-3xl md:text-5xl font-bold mb-2 md:mb-4 md:pb-2 ${Styling.GoldChromatic} ${Fonts.premium.className}`}
                      >
                        {service.name}
                      </h2>
                      <p className="text-lg md:text-xl text-gray-200 mb-4 md:mb-6">
                        {service.description}
                      </p>
                      <div className="tracking-widest font-light text-secondary-foreground">
                        STARTING AT{" "}
                        <span
                          className={`${Styling.GoldChromatic} font-semibold`}
                        >
                          ${service.starting_price}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
