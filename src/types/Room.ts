export enum RoomStandard {
  STANDARD = "STANDARD",
  PREMIUM = "PREMIUM",
  GOLD = "GOLD",
}

export interface Room {
  number: number;
  price: number;
  floor: number;
  standard: RoomStandard;
  beds: number;
}
