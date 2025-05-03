import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
    if (!GOOGLE_MAPS_API_KEY) {
      return NextResponse.json({ error: "Missing API key" }, { status: 500 });
    }

    const { input } = await request.json();
    if (!input || typeof input !== "string" || input.trim().length === 0) {
      return NextResponse.json({ predictions: [] });
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
      return NextResponse.json(
        { error: (errorBody as any)?.error_message || "API request failed" },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error in places autocomplete:", error);
    }
    return NextResponse.json(
      { error: "Failed to fetch predictions" },
      { status: 500 },
    );
  }
}
