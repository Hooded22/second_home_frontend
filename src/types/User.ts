export enum UserRoles {
  CUSTOMER = "user",
  STUFF = "stuff",
  MANAGER = "manager",
}

export interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
  role?: UserRoles;
}

export interface LoginUserResponse {
  token: string;
  userDetails: UserDetails;
}

export interface LoginUserCredentials {
  email: string;
  password: string;
}
