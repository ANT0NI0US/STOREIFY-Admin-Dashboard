import { parse, isBefore } from "date-fns";

export const isOnlySpaces = (value: string) => {
  return !value?.trim();
};

export function isDateInThePast(deliveredDate: string): boolean {
  const currentDate = new Date();
  const endDateObject = parse(deliveredDate, "dd MMM yyyy", new Date());
  return isBefore(endDateObject, currentDate);
}
