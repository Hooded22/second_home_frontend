import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialState, RequestError, RequestStatus } from "../../types";
import { Customer } from "../../types/Customer";

interface CustomersState extends InitialState {
  data: Customer[];
}

const initialState: CustomersState = {
  status: null,
  error: null,
  data: [],
};

const customersSlice = createSlice({
  name: "customers",
  initialState: initialState,
  reducers: {
    getAllCustomersRequest: (state) => {
      state.data = [];
      state.error = null;
      state.status = RequestStatus.PENDING;
    },
    getAllCustomersRequestSuccess: (
      state,
      action: PayloadAction<Customer[]>
    ) => {
      console.log("HERE: ", action.payload);
      state.data = action.payload;
      state.status = RequestStatus.SUCCESSFULL;
    },
    getAllCustomersRequestFailure: (
      state,
      action: PayloadAction<RequestError>
    ) => {
      state.error = action.payload.message;
      state.status = RequestStatus.FAILURE;
    },
    deleteCustomerRequest: (
      state,
      action: PayloadAction<{ id: Customer["_id"] }>
    ) => {},
    deleteCustomerSuccess: (state, action: PayloadAction<Customer[]>) => {
      state.data = action.payload;
    },
  },
});

export const {
  getAllCustomersRequest,
  getAllCustomersRequestSuccess,
  getAllCustomersRequestFailure,
  deleteCustomerSuccess,
} = customersSlice.actions;

export default customersSlice.reducer;
