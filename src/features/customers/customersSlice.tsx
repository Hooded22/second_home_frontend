import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialState, RequestError, RequestStatus } from "../../types";
import { Customer, CustomerToSend } from "../../types/Customer";

interface CustomersState extends InitialState {
  data: Customer[];
  addCustomerStatus: RequestStatus | null;
  editCustomerStatus: RequestStatus | null;
}

const initialState: CustomersState = {
  addCustomerStatus: null,
  editCustomerStatus: null,
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
    addCustomerRequest: (state, _: PayloadAction<CustomerToSend>) => {
      state.addCustomerStatus = RequestStatus.PENDING;
      state.error = null;
    },
    addCustomerSuccess: (state) => {
      state.addCustomerStatus = RequestStatus.SUCCESSFULL;
    },
    addCustomerFailure: (state, action: PayloadAction<RequestError>) => {
      state.addCustomerStatus = RequestStatus.FAILURE;
      state.error = action.payload.message;
    },
    resetAddCustomerStatus: (state) => {
      state.addCustomerStatus = null;
    },
    editCustomerRequest: (
      state,
      _: PayloadAction<{ id: Customer["_id"]; data: CustomerToSend }>
    ) => {
      state.editCustomerStatus = RequestStatus.PENDING;
    },
    editCustomerSuccess: (state) => {
      state.editCustomerStatus = RequestStatus.SUCCESSFULL;
    },
    editCustomerFailure: (state) => {
      state.editCustomerStatus = RequestStatus.FAILURE;
    },
    resetEditCustomerStatus: (state) => {
      state.editCustomerStatus = null;
    },
  },
});

export const {
  getAllCustomersRequest,
  getAllCustomersRequestSuccess,
  getAllCustomersRequestFailure,
  deleteCustomerSuccess,
  addCustomerRequest,
  addCustomerSuccess,
  addCustomerFailure,
  deleteCustomerRequest,
  editCustomerRequest,
  editCustomerSuccess,
  editCustomerFailure,
  resetEditCustomerStatus,
} = customersSlice.actions;

export default customersSlice.reducer;
