import { request } from "../../API/ApiService";
import { endpoints } from "../../API/Endpoints";
import { RequestStatus } from "../../types";
import { Room, RoomToSend } from "../../types/Room";

export const getAllRooms = async () => {
  try {
    const response = await request.get<Room[]>(endpoints.rooms);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addRoom = async (data: RoomToSend) => {
  try {
    return await request.post(endpoints.rooms, data);
  } catch (error) {
    throw error;
  }
};
