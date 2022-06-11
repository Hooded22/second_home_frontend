import { request } from "../../API/ApiService";
import { endpoints } from "../../API/Endpoints";
import { Customer } from "../../types/Customer";

export const getAllCustomers = async () => {
  try {
    const customers = await request.get<Customer[]>(endpoints.customers);
    return customers.data;
  } catch (error) {
    throw error;
  }
};
