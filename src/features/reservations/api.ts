import { request } from "../../API/ApiService";
import { endpoints } from "../../API/Endpoints";
import { Reservation, ReservationFromAPI } from "../../types/Reservation";

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
