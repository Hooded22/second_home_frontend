import {
  addCustomerFailure,
  addCustomerRequest,
  addCustomerSuccess,
  deleteCustomerRequest,
  getAllCustomersRequest,
  getAllCustomersRequestFailure,
  getAllCustomersRequestSuccess,
} from "./customersSlice";
import { put, takeLatest } from "redux-saga/effects";
import { Customer, CustomerToSend } from "../../types/Customer";
import { addCustomer, deleteCustomer, getAllCustomers } from "./api";
import { PayloadAction } from "@reduxjs/toolkit";
import { removeReservation } from "../reservations/api";

export function* getAllCustomersSaga() {
  try {
    const response: Customer[] = yield getAllCustomers();
    yield put(getAllCustomersRequestSuccess(response));
  } catch (error) {
    yield put(
      getAllCustomersRequestFailure({
        error,
        message: "Fail get all customers",
      })
    );
  }
}

export function* addCustomerSaga({ payload }: PayloadAction<CustomerToSend>) {
  try {
    yield addCustomer(payload);
    yield put(getAllCustomersRequest());
    yield put(addCustomerSuccess());
  } catch (error) {
    console.error("ERR: ", error);
    yield put(
      addCustomerFailure({
        error,
        message: "Customer with this name already exist",
      })
    );
  }
}

export function* deleteCustomerSaga({
  payload: { id },
}: PayloadAction<{ id: Customer["_id"] }>) {
  try {
    yield deleteCustomer(id);
    yield put(getAllCustomersRequest());
  } catch (error) {
    console.error("ERR: ", error);
  }
}

export const customersSaga = [
  takeLatest(getAllCustomersRequest, getAllCustomersSaga),
  takeLatest(addCustomerRequest, addCustomerSaga),
  takeLatest(deleteCustomerRequest, deleteCustomerSaga),
];
