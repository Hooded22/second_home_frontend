import { TextField } from "@mui/material";
import React, { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { ReservationFromAPI } from "../types/Reservation";

type ReservationFormData = Omit<ReservationFromAPI, "_id">;

interface IProps {}
const ReservationForm: FunctionComponent<IProps> = () => {
  const { register, handleSubmit } = useForm<ReservationFormData>();
  return (
    <div>
      <h1>ReservationForm</h1>
    </div>
  );
};

export default ReservationForm;
