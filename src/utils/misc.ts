export class MiscUtils {
  static capitalizeString(str?: string) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
