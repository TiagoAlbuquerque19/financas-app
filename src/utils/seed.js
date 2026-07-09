import { DEFAULT_CATEGORIES } from "./constants";

export function emptyUserData() {
  return {
    transactions: [],
    reminders: [],
    goals: [],
    categories: DEFAULT_CATEGORIES,
  };
}
