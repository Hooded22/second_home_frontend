import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestError, RequestStatus } from "../../types";
import {
  LoginUserCredentials,
  LoginUserResponse,
  UserDetails,
} from "../../types/User";

const getUserFromLocalStorage = (): UserDetails => {
  const user = localStorage.getItem("USER");
  return user ? JSON.parse(user) : undefined;
};

interface UserState {
  status: RequestStatus | null;
  error: string | null;
  token: string | null;
  user?: UserDetails;
}

const initialState: UserState = {
  status: null,
  error: null,
  token: localStorage.getItem("TOKEN"),
  user: getUserFromLocalStorage(),
};

const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    getUserDetails: (state, action: PayloadAction<LoginUserCredentials>) => {
      state.status = RequestStatus.PENDING;
      state.user = undefined;
    },
    getUserDetailsSuccess: (
      state,
      action: PayloadAction<LoginUserResponse>
    ) => {
      state.status = RequestStatus.SUCCESSFULL;
      state.user = action.payload.userDetails;
      state.token = action.payload.token;
    },
    getUserDetailFailure: (state, action: PayloadAction<RequestError>) => {
      state.status = RequestStatus.FAILURE;
      state.error = action.payload.message;
    },
  },
});

export const { getUserDetails, getUserDetailsSuccess, getUserDetailFailure } =
  usersSlice.actions;

export default usersSlice.reducer;
