import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialState, RequestError, RequestStatus } from "../../types";
import { Reservation } from "../../types/Reservation";

interface ReservationsState extends InitialState {
  data: Reservation[];
}

const initialState: ReservationsState = {
  status: null,
  error: null,
  data: [],
};

const reservationsSlice = createSlice({
  name: "reservations",
  initialState: initialState,
  reducers: {
    getAllReservationsRequest: (state) => {
      state.data = [];
      state.error = null;
      state.status = RequestStatus.PENDING;
    },
    getAllReservationsSuccess: (
      state,
      action: PayloadAction<Reservation[]>
    ) => {
      state.data = action.payload;
      state.status = RequestStatus.SUCCESSFULL;
    },
    getAllReservationsFailure: (state, action: PayloadAction<RequestError>) => {
      state.error = action.payload.message;
      state.status = RequestStatus.FAILURE;
    },
    deleteReservationRequest: (
      state,
      action: PayloadAction<{ id: Reservation["_id"] }>
    ) => {},
    deleteReservationSuccess: (state, action: PayloadAction<Reservation[]>) => {
      state.data = action.payload;
    },
  },
});

export const {
  getAllReservationsRequest,
  getAllReservationsFailure,
  getAllReservationsSuccess,
  deleteReservationRequest,
  deleteReservationSuccess,
} = reservationsSlice.actions;

export default reservationsSlice.reducer;
