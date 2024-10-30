export function improveFilterName(input: string): string {
  switch (input) {
    case "entry_type":
      return "Entry type";
    case "year":
      return "Year";
    default:
      return input;
  }
}
