export class MiscUtils {
  static parseServiceId(serviceId: string): string {
    return `${serviceId
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")}`;
  }
}
