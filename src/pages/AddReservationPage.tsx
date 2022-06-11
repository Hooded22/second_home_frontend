import { Container } from "@mui/material";
import React, { FunctionComponent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReservationForm, {
  ReservationFormData,
} from "../components/ReservationForm";
import {
  addReservationRequest,
  resetAddReservationStatus,
} from "../features/reservations/reservationsSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { RequestStatus } from "../types";

interface IProps {}
const AddReservationPage: FunctionComponent<IProps> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const addReservationCompleted = useAppSelector(
    (state) =>
      state.reservations.addReservationStatus === RequestStatus.SUCCESSFULL
  );

  const onSubmit = (data: ReservationFormData) => {
    dispatch(addReservationRequest(data));
  };

  useEffect(() => {
    if (addReservationCompleted) {
      navigate("/");
    }
  }, [addReservationCompleted, navigate]);

  return (
    <Container
      sx={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1>AddReservationPage</h1>
      <ReservationForm onSubmit={onSubmit} />
    </Container>
  );
};

export default AddReservationPage;
