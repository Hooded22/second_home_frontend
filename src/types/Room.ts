export enum RoomStandard {
  STANDARD = "STANDARD",
  PREMIUM = "PREMIUM",
  GOLD = "GOLD",
}

export interface Room {
  _id: string;
  number: number;
  price: number;
  floor: number;
  standard: RoomStandard;
  beds: number;
}

export type RoomToSend = Omit<Room, "_id">;
