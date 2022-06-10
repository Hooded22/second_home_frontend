import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";

export type StylesType = { [key in string]: SxProps<Theme> };
export enum RequestStatus {
  PENDING = "LOADING",
  SUCCESSFULL = "SUCCESSFULL",
  FAILURE = "FAILURE",
}
export type RequestError = { error: any; message: string };
export interface InitialState {
  status: RequestStatus | null;
  error: string | null;
}
