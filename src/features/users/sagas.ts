import {
  LoginUserCredentials,
  LoginUserResponse,
  UserDetails,
} from "../../types/User";
import { put, takeLatest } from "redux-saga/effects";
import {
  getUserDetailsSuccess,
  getUserDetailFailure,
  getUserDetails,
} from "./usersSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { loginUser } from "../../API/Auth";

export function* getUser({ payload }: PayloadAction<LoginUserCredentials>) {
  try {
    const response: LoginUserResponse = yield loginUser(payload);
    yield put(getUserDetailsSuccess(response));
  } catch (error) {
    console.error(error);
    yield put(getUserDetailFailure({ error, message: "Error" }));
  }
}

export const userSaga = [takeLatest(getUserDetails, getUser)];
