import { PayloadAction } from "@reduxjs/toolkit";
import { put, takeLatest } from "redux-saga/effects";
import { Room, RoomToSend } from "../../types/Room";
import { addRoom, getAllRooms } from "./api";
import {
  addRoomFailure,
  addRoomRequst,
  addRoomSuccess,
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

export function* addRoomSaga({ payload }: PayloadAction<RoomToSend>) {
  try {
    yield addRoom(payload);
    yield put(getAllRoomsRequest());
    yield put(addRoomSuccess());
  } catch (error: any) {
    yield put(
      addRoomFailure({ message: "Room with this number already exist", error })
    );
  }
}

export const roomsSaga = [
  takeLatest(getAllRoomsRequest, getAllRoomsSaga),
  takeLatest(addRoomRequst, addRoomSaga),
];
