import { PayloadAction } from "@reduxjs/toolkit";
import { put, takeLatest } from "redux-saga/effects";
import { ReservationFormData } from "../../components/ReservationForm";
import { Reservation, ReservationToSend } from "../../types/Reservation";
import { addReservation, getAllReservations, removeReservation } from "./api";
import {
  getAllReservationsRequest,
  getAllReservationsFailure,
  getAllReservationsSuccess,
  deleteReservationSuccess,
  deleteReservationRequest,
  addReservationSuccess,
  addReservationFailure,
  addReservationRequest,
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
    yield put(addReservationFailure);
  }
}

export const reservationsSaga = [
  takeLatest(getAllReservationsRequest, getAllReservationsSaga),
  takeLatest(deleteReservationRequest, removeReservationSaga),
  takeLatest(addReservationRequest, addReservationSaga),
];
