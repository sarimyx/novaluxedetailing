export class DateUtils {
  static monthFromIndex(index: number, adjustIndex?: boolean): string {
    const date = new Date();
    date.setMonth(adjustIndex ? index - 1 : index);
    return date.toLocaleString("en-US", { month: "long" });
  }

  static formatTimeLabel(time: string, includeZero?: boolean): string {
    const [hourStr, minuteStr] = time.split(":");
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);

    if (isNaN(hour) || isNaN(minute)) return time;

    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;

    return `${displayHour}${minute === 0 ? `${includeZero ? ":00" : ""}` : `:${minuteStr}`} ${period}`;
  }
}
