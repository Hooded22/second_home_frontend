import { request } from "../../API/ApiService";
import { endpoints } from "../../API/Endpoints";
import { Room } from "../../types/Room";

export const getAllRooms = async () => {
  try {
    const response = await request.get<Room[]>(endpoints.rooms);
    return response.data;
  } catch (error) {
    throw error;
  }
};
