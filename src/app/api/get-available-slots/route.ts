import { SheetsService } from "@/utils/server/sheets-service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
    if (!GOOGLE_CLIENT_EMAIL)
      return NextResponse.json({ error: "Missing API key" }, { status: 500 });

    const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;
    if (!GOOGLE_PRIVATE_KEY)
      return NextResponse.json({ error: "Missing API key" }, { status: 500 });

    const GOOGLE_SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;
    if (!GOOGLE_SPREADSHEET_ID)
      return NextResponse.json({ error: "Missing API key" }, { status: 500 });

    const sheetsService = new SheetsService({
      GOOGLE_CLIENT_EMAIL,
      GOOGLE_PRIVATE_KEY,
    });

    const slots = await sheetsService.getAvailableSlots(GOOGLE_SPREADSHEET_ID);

    return new Response(JSON.stringify(slots), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("ERROR FETCHING SLOTS:", JSON.stringify(err, null, 2));
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
