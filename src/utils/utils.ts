import { DateTime } from "luxon";

export const displayDateInString = (date: string) =>
  DateTime.fromJSDate(new Date(date)).toFormat("yyyy-MM-dd HH:mm");
