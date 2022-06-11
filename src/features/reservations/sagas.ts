import { PayloadAction } from "@reduxjs/toolkit";
import { put, takeLatest } from "redux-saga/effects";
import { Reservation, ReservationToSend } from "../../types/Reservation";
import {
  addReservation,
  getAllReservations,
  removeReservation,
  updateReservation,
} from "./api";
import {
  getAllReservationsRequest,
  getAllReservationsFailure,
  getAllReservationsSuccess,
  deleteReservationSuccess,
  deleteReservationRequest,
  addReservationSuccess,
  addReservationFailure,
  addReservationRequest,
  editReservationSuccess,
  editReservationFailure,
  editReservationRequest,
} from "./reservationsSlice";

export function* getAllReservationsSaga() {
  try {
    const response: Reservation[] = yield getAllReservations();
    yield put(getAllReservationsSuccess(response));
  } catch (error) {
    yield put(
      getAllReservationsFailure({ error, message: "Fail get all reservations" })
    );
  }
}

export function* removeReservationSaga({
  payload: { id },
}: PayloadAction<{ id: Reservation["_id"] }>) {
  try {
    const response: Reservation[] = yield removeReservation(id);
    yield put(deleteReservationSuccess(response));
  } catch (error) {
    console.error(error);
  }
}

export function* addReservationSaga({
  payload,
}: PayloadAction<ReservationToSend>) {
  try {
    yield addReservation(payload);
    yield put(getAllReservationsRequest());
    yield put(addReservationSuccess());
  } catch (error) {
    yield put(addReservationFailure());
  }
}

export function* editReservationSagat({
  payload: { id, data },
}: PayloadAction<{ data: ReservationToSend; id: string }>) {
  try {
    yield updateReservation(id, data);
    yield put(getAllReservationsRequest());
    yield put(editReservationSuccess());
  } catch (error) {
    yield put(editReservationFailure());
  }
}

export const reservationsSaga = [
  takeLatest(getAllReservationsRequest, getAllReservationsSaga),
  takeLatest(deleteReservationRequest, removeReservationSaga),
  takeLatest(addReservationRequest, addReservationSaga),
  takeLatest(editReservationRequest, editReservationSagat),
];
