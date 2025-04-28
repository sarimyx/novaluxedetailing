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

          // If it's BOOKED or BLOCKED, treat as null (unavailable)
          hourAvailability[`${hour}:00`] =
            value &&
            !value.toUpperCase().startsWith("BOOKED") &&
            !value.toUpperCase().startsWith("BLOCKED")
              ? value
              : null;
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
      const availabilitySheetId = await this.getSheetIdByName(
        spreadsheetId,
        "Availability",
      );

      const rangeToFetch = "Availability!A2:M";
      const response = await this.sheetsClient.spreadsheets.values.get({
        spreadsheetId,
        range: rangeToFetch,
      });

      const rows = response.data.values || [];

      const rowIndex = rows.findIndex((row) => row[1] === date);
      if (rowIndex === -1) {
        throw new Error("Date not found in availability sheet");
      }

      const startingHour = 8; // 8 AM
      const endingHour = 18; // 6 PM
      const columnOffset = 3; // A, B, C are not hours
      const lastValidColumnIndex = columnOffset + (endingHour - startingHour); // 13 for column M

      const columnIndex = columnOffset + (startHour - startingHour);

      if (columnIndex < 3 || columnIndex > lastValidColumnIndex) {
        throw new Error("Selected hour is outside valid range");
      }

      const currentValue = rows[rowIndex][columnIndex] || "";
      const detailerName = currentValue.toString().trim();

      const bookedLabel = detailerName ? `BOOKED (${detailerName})` : "BOOKED";
      const bufferLabel = "BLOCKED (Buffer)";

      const hoursToBlockBefore = 3;
      const hoursToBlockAfter = 3;

      // Block prior 3 hours
      for (let i = 1; i <= hoursToBlockBefore; i++) {
        const targetColumnIndex = columnIndex - i;
        if (
          targetColumnIndex >= 3 &&
          targetColumnIndex <= lastValidColumnIndex
        ) {
          rows[rowIndex][targetColumnIndex] = bufferLabel;
        }
      }

      // Booked cell
      rows[rowIndex][columnIndex] = bookedLabel;

      // Block next 3 hours
      for (let i = 1; i <= hoursToBlockAfter; i++) {
        const targetColumnIndex = columnIndex + i;
        if (
          targetColumnIndex >= 3 &&
          targetColumnIndex <= lastValidColumnIndex
        ) {
          rows[rowIndex][targetColumnIndex] = bufferLabel;
        }
      }

      await this.sheetsClient.spreadsheets.values.update({
        spreadsheetId,
        range: `Availability!A${rowIndex + 2}:M${rowIndex + 2}`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [rows[rowIndex].slice(0, 13)], // <-- only [A - M] columns
        },
      });

      const requests = [];

      // Red background for BOOKED cell
      requests.push({
        repeatCell: {
          range: {
            sheetId: availabilitySheetId,
            startRowIndex: rowIndex + 1,
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
      });

      // Orange background for buffer cells
      const bufferRanges = [];

      for (let i = 1; i <= hoursToBlockBefore; i++) {
        const targetColumnIndex = columnIndex - i;
        if (
          targetColumnIndex >= 3 &&
          targetColumnIndex <= lastValidColumnIndex
        ) {
          bufferRanges.push({
            startColumnIndex: targetColumnIndex,
            endColumnIndex: targetColumnIndex + 1,
          });
        }
      }

      for (let i = 1; i <= hoursToBlockAfter; i++) {
        const targetColumnIndex = columnIndex + i;
        if (
          targetColumnIndex >= 3 &&
          targetColumnIndex <= lastValidColumnIndex
        ) {
          bufferRanges.push({
            startColumnIndex: targetColumnIndex,
            endColumnIndex: targetColumnIndex + 1,
          });
        }
      }

      for (const range of bufferRanges) {
        requests.push({
          repeatCell: {
            range: {
              sheetId: availabilitySheetId,
              startRowIndex: rowIndex + 1,
              endRowIndex: rowIndex + 2,
              startColumnIndex: range.startColumnIndex,
              endColumnIndex: range.endColumnIndex,
            },
            cell: {
              userEnteredFormat: {
                backgroundColor: {
                  red: 1,
                  green: 0.8,
                  blue: 0.5,
                },
              },
            },
            fields: "userEnteredFormat.backgroundColor",
          },
        });
      }

      await this.sheetsClient.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: { requests },
      });

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
