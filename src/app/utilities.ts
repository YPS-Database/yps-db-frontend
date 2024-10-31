export function improveFilterName(input: string): string {
  switch (input) {
    case "entry_type":
      return "Entry type";
    case "region":
      return "Region";
    case "year":
      return "Year";
    case "youth_led":
      return "Youth-led / Authored";
    default:
      return input;
  }
}
