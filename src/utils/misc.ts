export class MiscUtils {
  static capitalizeString(str?: string) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static weekDayFromDateObject(
    dateObject: { year: number; month: number; day: number },
    format: "long" | "short" = "long",
  ): string {
    const date = new Date(
      dateObject.year,
      dateObject.month - 1,
      dateObject.day,
    );
    return date.toLocaleDateString("en-US", { weekday: format });
  }

  static dateFromDateObject(dateObject: {
    year: number;
    month: number;
    day: number;
  }): Date {
    return new Date(dateObject.year, dateObject.month - 1, dateObject.day);
  }

  static parseDateObject(dateObject: {
    year: number;
    month: number;
    day: number;
  }): {
    dateOnly: string;
    dateWithTime: string;
    weekDayOnly: string;
    readableDate: string;
  } {
    const date = new Date(
      dateObject.year,
      dateObject.month - 1,
      dateObject.day,
    );

    const dateOnly = date.toISOString().split("T")[0]; // e.g., "2025-04-27"
    const dateWithTime = date.toISOString(); // full ISO string
    const weekDayOnly = date.toLocaleDateString("en-US", { weekday: "long" }); // e.g., "Sunday"

    const day = date.getDate(); // 1-31
    const monthName = date.toLocaleDateString("en-US", { month: "long" }); // e.g., "April"
    const readableDate = `${weekDayOnly}, ${day} ${monthName}`;

    return { dateOnly, dateWithTime, weekDayOnly, readableDate };
  }

  static parseHour(hour: number): string {
    const date = new Date();
    date.setHours(hour, 0, 0, 0); // set hour with 0 minutes, seconds, milliseconds

    return date.toLocaleTimeString("en-US", { hour: "numeric", hour12: true }); // e.g., "8 AM" or "9 PM"
  }
}
