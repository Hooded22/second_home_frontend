import { Alert, CircularProgress, Container } from "@mui/material";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CustomersList from "../components/CustomersList";
import NavBar from "../components/NavBar";
import ReservationList from "../components/ReservationList";
import RoomsList from "../components/RoomsList";
import { getAllCustomersRequest } from "../features/customers/customersSlice";
import {
  getAllReservationsRequest,
  resetAddReservationStatus,
  resetEditReservationStatus,
} from "../features/reservations/reservationsSlice";
import { getAllRoomsRequest } from "../features/rooms/roomsSlice";
import { logoutUser } from "../features/users/usersSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { RequestStatus, StylesType } from "../types";
import { HomePageState } from "../types/NavigationState";

interface IProps {}
const HomePage: FunctionComponent<IProps> = () => {
  const dispatch = useAppDispatch();

  const [alert, setAlert] = useState("");

  const reservationsData = useAppSelector((state) => state.reservations.data);
  const customersData = useAppSelector((state) => state.customers.data);
  const roomsData = useAppSelector((state) => state.rooms.data);

  const loading = useAppSelector(
    (state) =>
      state.reservations.status === RequestStatus.PENDING ||
      state.customers.status === RequestStatus.PENDING ||
      state.rooms.status === RequestStatus.PENDING
  );
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
    dispatch(getAllCustomersRequest());
    dispatch(getAllRoomsRequest());
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

  if (loading) {
    return (
      <Container sx={styles.container}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={styles.container}>
      {alert && <Alert severity="success">{alert}</Alert>}
      <ReservationList data={reservationsData} />
      <CustomersList data={customersData} />
      <RoomsList data={roomsData} />
    </Container>
  );
};

const styles: StylesType = {
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
  },
};

export default HomePage;
