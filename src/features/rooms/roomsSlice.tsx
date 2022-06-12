import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialState, RequestError, RequestStatus } from "../../types";
import { Reservation } from "../../types/Reservation";
import { Room, RoomToSend } from "../../types/Room";

interface CustomersState extends InitialState {
  data: Room[];
  addRoomStatus: RequestStatus | null;
  editRoomStatus: RequestStatus | null;
}

const initialState: CustomersState = {
  editRoomStatus: null,
  addRoomStatus: null,
  status: null,
  error: null,
  data: [],
};

const customersSlice = createSlice({
  name: "rooms",
  initialState: initialState,
  reducers: {
    getAllRoomsRequest: (state) => {
      state.data = [];
      state.error = null;
      state.status = RequestStatus.PENDING;
    },
    getAllRoomsRequestSuccess: (state, action: PayloadAction<Room[]>) => {
      state.data = action.payload;
      state.status = RequestStatus.SUCCESSFULL;
    },
    getAllRoomsRequestFailure: (state, action: PayloadAction<RequestError>) => {
      state.error = action.payload.message;
      state.status = RequestStatus.FAILURE;
    },
    deleteRoomRequest: (
      state,
      action: PayloadAction<{ id: Room["_id"] }>
    ) => {},
    deleteCustomerSuccess: (state, action: PayloadAction<Room[]>) => {
      state.data = action.payload;
    },
    addRoomRequst: (state, _: PayloadAction<RoomToSend>) => {
      state.addRoomStatus = RequestStatus.PENDING;
      state.error = null;
    },
    addRoomSuccess: (state) => {
      state.addRoomStatus = RequestStatus.SUCCESSFULL;
    },
    addRoomFailure: (state, action: PayloadAction<RequestError>) => {
      state.addRoomStatus = RequestStatus.FAILURE;
      console.log("ERROR: ", action.payload);
      state.error = action.payload.message;
    },
    resetAddRoomStatus: (state) => {
      state.addRoomStatus = null;
    },
    editRoomRequest: (
      state,
      _: PayloadAction<{ id: Room["_id"]; data: RoomToSend }>
    ) => {
      state.error = null;
      state.editRoomStatus = RequestStatus.PENDING;
    },
    editRoomSuccess: (state) => {
      state.editRoomStatus = RequestStatus.SUCCESSFULL;
    },
    editRoomFailure: (state, action: PayloadAction<RequestError>) => {
      state.editRoomStatus = RequestStatus.FAILURE;
      state.error = action.payload.message;
    },
    resetEdtiRoomStatus: (state) => {
      state.editRoomStatus = null;
    },
  },
});

export const {
  getAllRoomsRequest,
  getAllRoomsRequestSuccess,
  getAllRoomsRequestFailure,
  deleteRoomRequest,
  addRoomRequst,
  addRoomSuccess,
  addRoomFailure,
  resetAddRoomStatus,
  editRoomRequest,
  editRoomSuccess,
  editRoomFailure,
  resetEdtiRoomStatus,
} = customersSlice.actions;

export default customersSlice.reducer;
