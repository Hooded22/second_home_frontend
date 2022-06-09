import { createAction } from "@reduxjs/toolkit"
import { GetAllUsersFailurePayload, GetAllUsersSuccessPayload } from "./payloads";

const getAllUsersRequest = createAction("GET_ALL_USERS_REQUEST");
const getAllUsersSuccess = createAction<GetAllUsersSuccessPayload>("GET_ALL_USERS_SUCCESS");
const getAllUsersFailure = createAction<GetAllUsersFailurePayload>("GET_ALL_USERS_FAILURE");

export {
    getAllUsersFailure,
    getAllUsersSuccess,
    getAllUsersRequest
}