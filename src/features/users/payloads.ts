import { UserDetails } from "../../types/User";

export type GetAllUsersSuccessPayload = UserDetails;
export type GetAllUsersFailurePayload = { error: any; message: string };
