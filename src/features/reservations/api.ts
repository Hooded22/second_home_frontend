import { request } from "../../API/ApiService";
import { endpoints } from "../../API/Endpoints";
import { ReservationFormData } from "../../components/ReservationForm";
import {
  Reservation,
  ReservationFromAPI,
  ReservationToSend,
} from "../../types/Reservation";

export const getAllReservations = async (
  params?: string
): Promise<Reservation[]> => {
  try {
    const url = params
      ? `${endpoints.reservations}${params}`
      : endpoints.reservations;
    const response = await request.get<ReservationFromAPI[]>(url);
    return response.data.map((item) => ({
      ...item,
      customer: item.customerId,
      room: item.roomId,
    }));
  } catch (error) {
    throw error;
  }
};

export const removeReservation = async (
  id: Reservation["_id"]
): Promise<Reservation[]> => {
  try {
    const response = await request.delete<ReservationFromAPI[]>(
      `${endpoints.reservations}/?id=${id}`
    );
    return response.data.map((item) => ({
      ...item,
      customer: item.customerId,
      room: item.roomId,
    }));
  } catch (error) {
    throw error;
  }
};

export const addReservation = async (dataToSend: ReservationToSend) => {
  try {
    return await request.post(endpoints.reservations, { ...dataToSend });
  } catch (error) {
    throw error;
  }
};

export const updateReservation = async (
  id: string,
  dataToSend: ReservationToSend
) => {
  try {
    const { customerId, endTime, roomId, startTime, status } = dataToSend;
    return await request.put<any, any, ReservationToSend>(
      `${endpoints.reservations}?id=${id}`,
      {
        customerId,
        endTime,
        roomId,
        startTime,
        status,
      }
    );
  } catch (error) {
    console.error("ERR: ", error);
    throw error;
  }
};
