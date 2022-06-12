import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialState, RequestError, RequestStatus } from "../../types";
import { Room, RoomToSend } from "../../types/Room";

interface CustomersState extends InitialState {
  data: Room[];
  addRoomStatus: RequestStatus | null;
}

const initialState: CustomersState = {
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
} = customersSlice.actions;

export default customersSlice.reducer;
