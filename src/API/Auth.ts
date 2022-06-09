import { LoginUserCredentials, UserDetails } from "../types/User";
import { request } from "./ApiService";
import { endpoints } from "./Endpoints";

export const loginUser = async ({ email, password }: LoginUserCredentials) => {
  try {
    const response = await request.post<UserDetails>(endpoints.login, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
