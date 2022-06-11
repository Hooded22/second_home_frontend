import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReservationFormData } from "../../components/ReservationForm";
import { InitialState, RequestError, RequestStatus } from "../../types";
import { Reservation, ReservationToSend } from "../../types/Reservation";

interface ReservationsState extends InitialState {
  data: Reservation[];
  addReservationStatus: RequestStatus | null;
  editReservationStatus: RequestStatus | null;
}

const initialState: ReservationsState = {
  status: null,
  addReservationStatus: null,
  editReservationStatus: null,
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
    addReservationRequest: (
      state,
      action: PayloadAction<ReservationToSend>
    ) => {
      state.addReservationStatus = RequestStatus.PENDING;
    },
    addReservationSuccess: (state) => {
      state.addReservationStatus = RequestStatus.SUCCESSFULL;
    },
    addReservationFailure: (state) => {
      state.addReservationStatus = RequestStatus.FAILURE;
    },
    resetAddReservationStatus: (state) => {
      state.addReservationStatus = null;
    },
    editReservationRequest: (
      state,
      action: PayloadAction<{ data: ReservationToSend; id: string }>
    ) => {
      state.editReservationStatus = RequestStatus.PENDING;
    },
    editReservationSuccess: (state) => {
      state.editReservationStatus = RequestStatus.SUCCESSFULL;
    },
    editReservationFailure: (state) => {
      state.editReservationStatus = RequestStatus.FAILURE;
    },
    resetEditReservationStatus: (state) => {
      state.editReservationStatus = null;
    },
  },
});

export const {
  getAllReservationsRequest,
  getAllReservationsFailure,
  getAllReservationsSuccess,
  deleteReservationRequest,
  deleteReservationSuccess,
  addReservationRequest,
  addReservationSuccess,
  addReservationFailure,
  resetAddReservationStatus,
  editReservationRequest,
  editReservationSuccess,
  editReservationFailure,
  resetEditReservationStatus,
} = reservationsSlice.actions;

export default reservationsSlice.reducer;
