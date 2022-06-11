import { Customer } from "./Customer";
import { Room } from "./Room";

export enum ReservationStatuses {
  OPEN = "open",
  CLOSED = "closed",
  DELAYED = "delayd",
  CANCELED = "canceled",
}

export interface Reservation {
  _id: string;
  customer: Customer;
  startTime: string;
  endTime: string;
  status: ReservationStatuses;
  cost: number;
  room: Room;
}

export type ReservationFromAPI = Omit<Reservation, "customer" | "room"> & {
  customerId: Customer;
  roomId: Room;
};

export type ReservationToSend = Omit<
  Reservation,
  "customer" | "room" | "_id"
> & {
  customerId: string;
  roomId: string;
};
