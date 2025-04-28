export const runtime = "edge";

import { SheetsService } from "@/utils/server/sheets-service";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      phone,
      email,
      address,
      selectedDate,
      selectedHour,
      vehicleType,
      service,
    } = body;

    if (!name || !phone || !selectedDate || !selectedHour || !vehicleType) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
      });
    }

    const sheetsService = new SheetsService({
      GOOGLE_CLIENT_EMAIL: process.env.GOOGLE_CLIENT_EMAIL!,
      GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY!,
    });

    // Block the availability slot (and get the detailer's name on the cell)
    const detailerName = await sheetsService.blockAvailabilitySlot(
      process.env.SPREADSHEET_ID!,
      selectedDate,
      selectedHour,
    );

    const newBooking = [
      new Date().toISOString(),
      name,
      detailerName,
      phone,
      email,
      address,
      selectedDate,
      selectedHour,
      vehicleType,
      service.name,
    ];

    await sheetsService.addBooking(process.env.SPREADSHEET_ID!, newBooking);

    return new Response(JSON.stringify({ ok: true }));
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
