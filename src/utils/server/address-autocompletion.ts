"use server";

export async function addressAutocompletion(input: string): Promise<{
  predictions?: any[];
  error?: string;
}> {
  try {
    const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
    if (!GOOGLE_MAPS_API_KEY) {
      return { error: "Missing API key" };
    }

    if (!input || typeof input !== "string" || input.trim().length === 0) {
      return { predictions: [] };
    }

    const params = new URLSearchParams({
      input: input.trim(),
      types: "address",
      components: "country:us",
      locationbias: "rectangle:37.0000,-114.0500|42.0000,-109.0500",
      key: GOOGLE_MAPS_API_KEY,
    });

    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?${params.toString()}`,
      {
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        next: { revalidate: 0 },
      },
    );

    if (!res.ok) {
      const contentType = res.headers.get("content-type") || "";
      const errorBody = contentType.includes("application/json")
        ? await res.json()
        : await res.text();
      return {
        error: (errorBody as any)?.error_message || "API request failed",
      };
    }

    const data = await res.json();
    return { predictions: data.predictions || [] };
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error in places autocomplete:", error);
    }
    return { error: "Failed to fetch predictions" };
  }
}
