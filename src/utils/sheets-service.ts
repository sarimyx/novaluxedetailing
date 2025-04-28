import { google } from "googleapis";

export class SheetsService {
  private sheetsClient;

  constructor(env: {
    GOOGLE_CLIENT_EMAIL: string;
    GOOGLE_PRIVATE_KEY: string;
  }) {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: env.GOOGLE_CLIENT_EMAIL,
        private_key: env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    this.sheetsClient = google.sheets({ version: "v4", auth });
  }

  async getAvailableSlots(
    spreadsheetId: string,
    range: string = "Availability!A2:M",
  ) {
    try {
      const response = await this.sheetsClient.spreadsheets.values.get({
        spreadsheetId,
        range,
      });

      const rows = response.data.values;
      if (!rows || rows.length === 0) {
        return [];
      }

      const slots = rows.map((row) => {
        const [index, date, weekday, ...hours] = row;

        const hourAvailability: { [hour: string]: string | null } = {};
        const startingHour = 8; // 8 AM

        for (let i = 0; i < hours.length; i++) {
          const hour = startingHour + i;
          const value = hours[i];

          // If it's BOOKED, treat as null (unavailable)
          hourAvailability[`${hour}:00`] =
            value && value.toUpperCase() !== "BOOKED" ? value : null;
        }

        return {
          date,
          weekday,
          availableHours: hourAvailability,
        };
      });

      return slots;
    } catch (error) {
      console.error("SheetsService Error:", error);
      throw new Error("Failed to fetch available slots");
    }
  }

  async addBooking(spreadsheetId: string, values: any[]) {
    try {
      const response = await this.sheetsClient.spreadsheets.values.append({
        spreadsheetId,
        range: "Bookings!A1", // 👈 assuming you have a "Bookings" sheet tab
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [values],
        },
      });

      return response.data;
    } catch (error) {
      console.error("SheetsService AddBooking Error:", error);
      throw new Error("Failed to write booking");
    }
  }

  async blockAvailabilitySlot(
    spreadsheetId: string,
    date: string,
    startHour: number,
  ): Promise<string> {
    try {
      // 1. Get the correct sheetId dynamically for "Availability"
      const availabilitySheetId = await this.getSheetIdByName(
        spreadsheetId,
        "Availability",
      );

      // 2. Fetch the current availability rows
      const rangeToFetch = "Availability!A2:M"; // A2:M = full availability grid
      const response = await this.sheetsClient.spreadsheets.values.get({
        spreadsheetId,
        range: rangeToFetch,
      });

      const rows = response.data.values || [];

      // 3. Find the correct row based on the date
      const rowIndex = rows.findIndex((row) => row[1] === date); // column B = date

      if (rowIndex === -1) {
        throw new Error("Date not found in availability sheet");
      }

      // 4. Find the correct column based on the hour
      const startingHour = 8; // 8:00 AM
      const columnOffset = 3; // Columns A, B, C are non-hour columns

      const columnIndex = columnOffset + (startHour - startingHour);

      if (columnIndex < 3 || columnIndex > 13) {
        // Only allow 08:00 - 18:00 slots
        throw new Error("Selected hour is outside valid range");
      }

      // 5. Capture the detailer's name BEFORE overwriting
      const currentValue = rows[rowIndex][columnIndex] || "";
      const detailerName = currentValue.toString().trim();

      // 6. Overwrite the cell with "BOOKED"
      rows[rowIndex][columnIndex] = "BOOKED";

      await this.sheetsClient.spreadsheets.values.update({
        spreadsheetId,
        range: `Availability!A${rowIndex + 2}:M${rowIndex + 2}`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [rows[rowIndex]],
        },
      });

      // 7. Apply red background formatting to the booked cell
      const requests = [
        {
          repeatCell: {
            range: {
              sheetId: availabilitySheetId,
              startRowIndex: rowIndex + 1, // +1 because A2 corresponds to rowIndex 1
              endRowIndex: rowIndex + 2,
              startColumnIndex: columnIndex,
              endColumnIndex: columnIndex + 1,
            },
            cell: {
              userEnteredFormat: {
                backgroundColor: {
                  red: 1,
                  green: 0.7,
                  blue: 0.7,
                },
              },
            },
            fields: "userEnteredFormat.backgroundColor",
          },
        },
      ];

      await this.sheetsClient.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: { requests },
      });

      // 8. Return the captured detailer's name for use in the booking
      return detailerName;
    } catch (error) {
      console.error("SheetsService Block Slot Error:", error);
      throw new Error("Failed to block slot");
    }
  }

  async getSheetIdByName(
    spreadsheetId: string,
    sheetName: string,
  ): Promise<number | null> {
    const response = await this.sheetsClient.spreadsheets.get({
      spreadsheetId,
    });

    const sheet = response.data.sheets?.find(
      (s) => s.properties?.title === sheetName,
    );

    if (!sheet || sheet.properties?.sheetId === undefined) {
      throw new Error(`Sheet with name "${sheetName}" not found`);
    }

    return sheet.properties.sheetId;
  }
}
