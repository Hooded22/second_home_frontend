import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialState, RequestError, RequestStatus } from "../../types";
import { Room } from "../../types/Room";

interface CustomersState extends InitialState {
  data: Room[];
}

const initialState: CustomersState = {
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
  },
});

export const {
  getAllRoomsRequest,
  getAllRoomsRequestSuccess,
  getAllRoomsRequestFailure,
  deleteRoomRequest,
} = customersSlice.actions;

export default customersSlice.reducer;
