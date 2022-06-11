import {
  getAllCustomersRequest,
  getAllCustomersRequestFailure,
  getAllCustomersRequestSuccess,
} from "./customersSlice";
import { put, takeLatest } from "redux-saga/effects";
import { Customer } from "../../types/Customer";
import { getAllCustomers } from "./api";

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

export const customersSaga = [
  takeLatest(getAllCustomersRequest, getAllCustomersSaga),
];
