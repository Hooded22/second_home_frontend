export interface Customer {
  _id: string;
  name: string;
  lastName: string;
  birthDate: Date;
}

export type CustomerToSend = Omit<Customer, "_id">;
