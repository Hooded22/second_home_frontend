import { put, takeLatest } from "redux-saga/effects";
import { Room } from "../../types/Room";
import { getAllRooms } from "./api";
import {
  getAllRoomsRequest,
  getAllRoomsRequestFailure,
  getAllRoomsRequestSuccess,
} from "./roomsSlice";

export function* getAllRoomsSaga() {
  try {
    const response: Room[] = yield getAllRooms();
    yield put(getAllRoomsRequestSuccess(response));
  } catch (error) {
    yield put(
      getAllRoomsRequestFailure({
        error,
        message: "Fail get all rooms",
      })
    );
  }
}

export const roomsSaga = [takeLatest(getAllRoomsRequest, getAllRoomsSaga)];
