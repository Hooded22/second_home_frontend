import { PayloadAction } from "@reduxjs/toolkit";
import { put, takeLatest } from "redux-saga/effects";
import { Customer } from "../../types/Customer";
import { Reservation, ReservationToSend } from "../../types/Reservation";
import { Room } from "../../types/Room";
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
  getReservationsForRoomIdSuccess,
  getReservationsForRoomIdFailure,
  getReservationsForRoomIdRequest,
  getReservationsForCustomerIdSuccess,
  getReservationsForCustomerIdFailure,
  getReservationsForCustomerIdRequest,
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

export function* getReservationsForRoomIdSaga({
  payload: { id },
}: PayloadAction<{ id: Room["_id"] }>) {
  try {
    const response: Reservation[] = yield getAllReservations(`?roomId=${id}`);
    yield put(getReservationsForRoomIdSuccess(response));
  } catch (error) {
    yield put(getReservationsForRoomIdFailure());
  }
}

export function* getReservationsForCustomerIdSaga({
  payload: { id },
}: PayloadAction<{ id: Customer["_id"] }>) {
  try {
    const response: Reservation[] = yield getAllReservations(
      `?customerId=${id}`
    );
    yield put(getReservationsForCustomerIdSuccess(response));
  } catch (error) {
    yield put(getReservationsForCustomerIdFailure());
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
  takeLatest(getReservationsForRoomIdRequest, getReservationsForRoomIdSaga),
  takeLatest(
    getReservationsForCustomerIdRequest,
    getReservationsForCustomerIdSaga
  ),
];
