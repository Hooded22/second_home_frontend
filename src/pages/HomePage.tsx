import { Alert, CircularProgress, Container } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import CustomersList from "../components/CustomersList";
import ReservationList from "../components/ReservationList";
import RoomsList from "../components/RoomsList";
import {
  getAllCustomersRequest,
  resetEditCustomerStatus,
} from "../features/customers/customersSlice";
import {
  getAllReservationsRequest,
  resetAddReservationStatus,
  resetEditReservationStatus,
} from "../features/reservations/reservationsSlice";
import {
  getAllRoomsRequest,
  resetAddRoomStatus,
  resetEdtiRoomStatus,
} from "../features/rooms/roomsSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { RequestStatus, StylesType } from "../types";
import { UserRoles } from "../types/User";

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
  const addCustomerCompleted = useAppSelector(
    (state) => state.customers.addCustomerStatus === RequestStatus.SUCCESSFULL
  );
  const editCustomerCompleted = useAppSelector(
    (state) => state.customers.editCustomerStatus === RequestStatus.SUCCESSFULL
  );
  const addRoomCompleted = useAppSelector(
    (state) => state.rooms.addRoomStatus === RequestStatus.SUCCESSFULL
  );
  const editRoomCompleted = useAppSelector(
    (state) => state.rooms.editRoomStatus === RequestStatus.SUCCESSFULL
  );
  const role = useAppSelector((state) => state.users.user?.role);

  useEffect(() => {
    dispatch(getAllReservationsRequest());
    dispatch(getAllCustomersRequest());
    dispatch(getAllRoomsRequest());
  }, [dispatch]);

  useEffect(() => {
    if (addReservationCompleted || addCustomerCompleted || addRoomCompleted) {
      setAlert("Added successfully");
      setTimeout(() => {
        setAlert("");
        addReservationCompleted
          ? dispatch(resetAddReservationStatus())
          : addCustomerCompleted
          ? dispatch(resetAddCustomerStatus())
          : dispatch(resetAddRoomStatus());
      }, 3000);
    }

    if (
      editReservationCompleted ||
      editCustomerCompleted ||
      editRoomCompleted
    ) {
      setAlert("Edit successfully");
      setTimeout(() => {
        setAlert("");
        editReservationCompleted
          ? dispatch(resetEditReservationStatus())
          : editRoomCompleted
          ? dispatch(resetEdtiRoomStatus())
          : dispatch(resetEditCustomerStatus());
      }, 3000);
    }
  }, [
    addCustomerCompleted,
    addReservationCompleted,
    dispatch,
    editCustomerCompleted,
    editReservationCompleted,
  ]);

  if (loading) {
    return (
      <Container sx={styles.container}>
        <CircularProgress
          sx={{
            marginTop: 50,
            alignSelf: "center",
          }}
        />
      </Container>
    );
  }

  if (role && role !== UserRoles.MANAGER) {
    return (
      <Container sx={styles.container}>
        <h1>Ask your supervisor for permissions</h1>
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
function resetAddCustomerStatus(): any {
  throw new Error("Function not implemented.");
}
