"use server";

let cachedData: any = null;
let lastFetched: number | null = null;
const TTL = 1000 * 60 * 10; // 10 minutes

import { ReviewsResponse } from "@/types/reviews";

export async function getReviews(): Promise<ReviewsResponse> {
  const FEATURABLE_WIDGET_ID = process.env.FEATURABLE_WIDGET_ID;

  if (!FEATURABLE_WIDGET_ID) {
    throw new Error("Missing API key");
  }

  const now = Date.now();

  // Return cached version if within TTL
  if (cachedData && lastFetched && now - lastFetched < TTL) {
    return cachedData;
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

    return data;
  } catch (err) {
    throw new Error("Failed to fetch reviews");
  }
}
