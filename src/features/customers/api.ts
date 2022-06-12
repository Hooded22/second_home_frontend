import { request } from "../../API/ApiService";
import { endpoints } from "../../API/Endpoints";
import { Customer, CustomerToSend } from "../../types/Customer";

export const getAllCustomers = async () => {
  try {
    const customers = await request.get<Customer[]>(endpoints.customers);
    return customers.data;
  } catch (error) {
    throw error;
  }
};

export const addCustomer = async (data: CustomerToSend) => {
  try {
    return await request.post(endpoints.customers, { ...data });
  } catch (error) {
    console.log("ERR: ", error);
    throw error;
  }
};

export const deleteCustomer = async (id: Customer["_id"]) => {
  try {
    return await request.delete(`${endpoints.customers}/?id=${id}`);
  } catch (error) {
    throw error;
  }
};

export const editCustomer = async (
  id: Customer["_id"],
  data: CustomerToSend
) => {
  try {
    const { birthDate, lastName, name } = data;
    return await request.put<any, any, CustomerToSend>(
      `${endpoints.customers}?id=${id}`,
      {
        lastName,
        name,
        birthDate,
      }
    );
  } catch (error) {
    throw error;
  }
};
