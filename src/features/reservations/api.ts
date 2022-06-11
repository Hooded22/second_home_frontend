import { request } from "../../API/ApiService";
import { endpoints } from "../../API/Endpoints";
import { ReservationFormData } from "../../components/ReservationForm";
import {
  Reservation,
  ReservationFromAPI,
  ReservationToSend,
} from "../../types/Reservation";

export const getAllReservations = async (): Promise<Reservation[]> => {
  try {
    const response = await request.get<ReservationFromAPI[]>(
      endpoints.reservations
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
    console.error("ERR: ", error);

    throw error;
  }
};
