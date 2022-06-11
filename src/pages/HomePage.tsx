import { Alert } from "@mui/material";
import React, { FunctionComponent, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReservationList from "../components/ReservationList";
import {
  getAllReservationsRequest,
  resetAddReservationStatus,
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
  const addReservationCompleted = useAppSelector(
    (state) =>
      state.reservations.addReservationStatus === RequestStatus.SUCCESSFULL
  );

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    dispatch(getAllReservationsRequest());
  }, []);

  useEffect(() => {
    if (addReservationCompleted) {
      setTimeout(() => dispatch(resetAddReservationStatus()), 3000);
    }
  }, [addReservationCompleted]);

  return (
    <div>
      {addReservationCompleted && (
        <Alert severity="success">Reservation added successfully</Alert>
      )}
      <h1>HomePage 123</h1>
      <button type="button" onClick={logoutHandler}>
        Logout
      </button>
      <ReservationList data={data} />
    </div>
  );
};

export default HomePage;
