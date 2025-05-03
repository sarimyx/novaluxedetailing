import { NextResponse } from "next/server";

let cachedData: any = null;
let lastFetched: number | null = null;
const TTL = 1000 * 60 * 10; // 10 minutes

export async function GET() {
  const FEATURABLE_WIDGET_ID = process.env.FEATURABLE_WIDGET_ID;

  if (!FEATURABLE_WIDGET_ID) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  const now = Date.now();

  // Return cached version if within TTL
  if (cachedData && lastFetched && now - lastFetched < TTL) {
    return NextResponse.json(cachedData);
  }

  try {
    const response = await fetch(
      `https://featurable.com/api/v1/widgets/${FEATURABLE_WIDGET_ID}`,
      {
        next: { revalidate: 600 },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }

    const data = await response.json();

    // Cache result in memory
    cachedData = data;
    lastFetched = now;

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 },
    );
  }
}
