"use server";

import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";
import { JWT } from "google-auth-library";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { AvailabilitySlot } from "@/types/availability-slot";

// Constants
const FIXED_HEADERS = new Set(["year", "month", "day", "weekday"]);
const VALID_STATUS = ["DARREN", "KALEENA", "OPEN"];

// Util: Check if a time slot is available
function isTimeSlotAvailable(value?: any): boolean {
  return typeof value === "string" && VALID_STATUS.includes(value.trim());
}

// Util: Load spreadsheet and return relevant sheets
async function loadSpreadsheetSheets(): Promise<{
  availabilitySheet: GoogleSpreadsheetWorksheet;
  bookingsSheet: GoogleSpreadsheetWorksheet;
}> {
  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const spreadsheet = new GoogleSpreadsheet(
    process.env.GOOGLE_SPREADSHEET_ID!,
    serviceAccountAuth,
  );
  await spreadsheet.loadInfo();

  const availabilitySheet = spreadsheet.sheetsByTitle["Availability"];
  const bookingsSheet = spreadsheet.sheetsByTitle["Bookings"];

  await availabilitySheet.loadHeaderRow(1);

  return { availabilitySheet, bookingsSheet };
}

// Util: Extract only time slot headers
function getTimeHeaders(headers: string[]): string[] {
  return headers.filter((h) => !FIXED_HEADERS.has(h.toLowerCase()));
}

// Util: Find row by date
function findRowByDate(rows: any[], year: string, month: string, day: string) {
  return rows.find(
    (row) =>
      row.get("year") === year &&
      row.get("month") === month &&
      row.get("day") === day,
  );
}

// API: Get structured availability
export async function getAvailability(): Promise<AvailabilitySlot[]> {
  const { availabilitySheet } = await loadSpreadsheetSheets();
  const headers = availabilitySheet.headerValues;
  const timeHeaders = getTimeHeaders(headers);
  const rows = await availabilitySheet.getRows();

  return rows
    .filter(
      (row) =>
        row.get("year") &&
        row.get("month") &&
        row.get("day") &&
        row.get("weekday"),
    )
    .map((row) => {
      const times = timeHeaders.filter((time) =>
        isTimeSlotAvailable(row.get(time)),
      );
      return {
        year: row.get("year") || "",
        month: row.get("month") || "",
        day: row.get("day") || "",
        weekday: row.get("weekday") || "",
        times,
      };
    })
    .filter((slot) => {
      if (slot.times.length === 0) return false;
      const date = new Date(
        parseInt(slot.year),
        parseInt(slot.month) - 1,
        parseInt(slot.day),
      );
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    });
}

// API: Verify availability before booking
export async function verifyTimeSlotAvailability({
  year,
  month,
  day,
  time,
}: {
  year?: string;
  month?: string;
  day?: string;
  time?: string;
}): Promise<boolean> {
  if (!year || !month || !day || !time) return false;

  const { availabilitySheet, bookingsSheet } = await loadSpreadsheetSheets();

  // First check availability sheet
  const availabilityRows = await availabilitySheet.getRows();
  const availabilityRow = findRowByDate(availabilityRows, year, month, day);
  if (!availabilityRow || !isTimeSlotAvailable(availabilityRow.get(time))) {
    return false;
  }

  // Then check bookings sheet for any existing bookings
  const bookingsRows = await bookingsSheet.getRows();
  const existingBooking = bookingsRows.find(
    (row) =>
      row.get("scheduled_year") === year &&
      row.get("scheduled_month") === month &&
      row.get("scheduled_day") === day &&
      row.get("scheduled_time") === time,
  );

  // Return true only if the slot is available AND there's no existing booking
  return !existingBooking;
}

// API: Submit a new booking and update sheet
export async function submitBooking({
  year,
  month,
  day,
  time,
  serviceId,
  customerDetails,
}: {
  year: string;
  month: string;
  day: string;
  time: string;
  serviceId: string;
  customerDetails: {
    name: string;
    phone: string;
    address: string;
    vehicle: string;
  };
}): Promise<{
  success?: { bookingId: string };
  error?: { message: string };
}> {
  const { availabilitySheet, bookingsSheet } = await loadSpreadsheetSheets();
  const rows = await availabilitySheet.getRows();
  const row = findRowByDate(rows, year, month, day);
  if (!row) return { error: { message: "Date not found" } };

  const value = row.get(time);
  if (!isTimeSlotAvailable(value))
    return { error: { message: "Time slot not available" } };

  const headers = availabilitySheet.headerValues;
  const timeHeaders = getTimeHeaders(headers);
  const slotIndex = timeHeaders.indexOf(time);

  if (slotIndex === -1) return { error: { message: "Time slot not found" } };

  // Mark -3 to +3 surrounding slots as "-" first
  for (let offset = -3; offset <= 3; offset++) {
    if (offset === 0) continue;
    const neighborIndex = slotIndex + offset;
    const neighborTime = timeHeaders[neighborIndex];
    if (neighborTime) {
      // Set to '-' in any case (even if no prior value).
      row.set(neighborTime, "-");
    }
  }

  // Save the row changes for surrounding slots
  await row.save();

  // Now mark the target slot as BOOKED
  await availabilitySheet.loadCells();
  const colIndex = headers.indexOf(timeHeaders[slotIndex]);
  const rowIndex = row.rowNumber - 1;
  const cell = availabilitySheet.getCell(rowIndex, colIndex);
  cell.value = "BOOKED";
  cell.textFormat = { bold: true };
  await availabilitySheet.saveUpdatedCells();

  const bookingId = uuidv4();
  const timestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss");

  await bookingsSheet.addRow({
    timestamp,
    booking_id: bookingId,
    service_id: serviceId,
    scheduled_year: year,
    scheduled_month: month,
    scheduled_day: day,
    scheduled_weekday: row.get("weekday") || "",
    scheduled_time: time,
    customer_name: customerDetails.name,
    customer_phone: customerDetails.phone,
    customer_address: customerDetails.address,
    customer_vehicle: customerDetails.vehicle,
  });

  return {
    success: { bookingId },
  };
}
