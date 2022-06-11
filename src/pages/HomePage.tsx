import { Alert, Container } from "@mui/material";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import ReservationList from "../components/ReservationList";
import {
  getAllReservationsRequest,
  resetAddReservationStatus,
  resetEditReservationStatus,
} from "../features/reservations/reservationsSlice";
import { logoutUser } from "../features/users/usersSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { RequestStatus } from "../types";
import { HomePageState } from "../types/NavigationState";

interface IProps {}
const HomePage: FunctionComponent<IProps> = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.reservations.data);
  const [alert, setAlert] = useState("");
  const addReservationCompleted = useAppSelector(
    (state) =>
      state.reservations.addReservationStatus === RequestStatus.SUCCESSFULL
  );
  const editReservationCompleted = useAppSelector(
    (state) =>
      state.reservations.editReservationStatus === RequestStatus.SUCCESSFULL
  );

  useEffect(() => {
    dispatch(getAllReservationsRequest());
  }, []);

  useEffect(() => {
    if (addReservationCompleted) {
      setAlert("Added successfully");
      setTimeout(() => {
        setAlert("");
        dispatch(resetAddReservationStatus());
      }, 3000);
    }

    if (editReservationCompleted) {
      setAlert("Edit successfully");
      setTimeout(() => {
        setAlert("");
        dispatch(resetEditReservationStatus());
      }, 3000);
    }
  }, [addReservationCompleted, dispatch, editReservationCompleted]);

  return (
    <Container
      sx={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {alert && <Alert severity="success">{alert}</Alert>}
      <ReservationList data={data} />
    </Container>
  );
};

export default HomePage;
