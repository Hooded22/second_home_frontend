export interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
}

export interface LoginUserResponse {
  token: string;
  userDetails: UserDetails;
}

export interface LoginUserCredentials {
  email: string;
  password: string;
}
