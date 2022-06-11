import { Container } from "@mui/material";
import React, { FunctionComponent, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import ReservationForm, {
  ReservationFormData,
} from "../components/ReservationForm";
import {
  editReservationRequest,
  resetEditReservationStatus,
} from "../features/reservations/reservationsSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { RequestStatus } from "../types";
import { Reservation } from "../types/Reservation";

interface IProps {}
const EditReservationPage: FunctionComponent<IProps> = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useAppDispatch();
  const currentNavigationState = state as { data?: Reservation };
  const editCompleted = useAppSelector(
    (state) =>
      state.reservations.editReservationStatus === RequestStatus.SUCCESSFULL
  );

  useEffect(() => {
    if (!currentNavigationState?.data) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (editCompleted) {
      navigate("/");
    }
  }, [editCompleted, navigate]);

  const onSubmit = (data: ReservationFormData) => {
    if (!currentNavigationState.data?._id) {
      return;
    }
    dispatch(
      editReservationRequest({ data, id: currentNavigationState.data._id })
    );
  };

  return (
    <Container
      sx={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1>Add new reservation</h1>
      <ReservationForm
        onSubmit={onSubmit}
        defaultData={currentNavigationState.data}
      />
    </Container>
  );
};

export default EditReservationPage;
