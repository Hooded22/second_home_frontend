import { CircularProgress, Container, Grid, TextField } from "@mui/material";
import React, { FunctionComponent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getReservationsForCustomerIdRequest,
  getReservationsForRoomIdRequest,
} from "../features/reservations/reservationsSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { RequestStatus } from "../types";
import { Reservation } from "../types/Reservation";
import { Room } from "../types/Room";
import { displayDateInString } from "../utils/utils";

interface IProps {}
const RoomDetails: FunctionComponent<IProps> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const currentNavigationState = state as { data?: Room };
  const reservationsForRoom = useAppSelector(
    (state) => state.reservations.data
  );
  const loading = useAppSelector(
    (state) => state.reservations.status === RequestStatus.PENDING
  );

  useEffect(() => {
    if (!currentNavigationState?.data) {
      navigate("/");
    } else {
      dispatch(
        getReservationsForRoomIdRequest({
          id: currentNavigationState?.data._id,
        })
      );
    }
  }, [currentNavigationState?.data, navigate]);

  if (!currentNavigationState.data) {
    return null;
  }

  const navigateToReservationDetails = (reservation: Reservation) => {
    navigate("/reservationDetails", { state: { data: reservation } });
  };

  const { beds, floor, number, price, standard } = currentNavigationState.data;
  return (
    <Container
      sx={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h2>Room details</h2>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField
            margin="normal"
            label={"Number"}
            defaultValue={number}
            InputProps={{
              readOnly: true,
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            margin="normal"
            label={"Floor"}
            defaultValue={floor}
            InputProps={{
              readOnly: true,
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            margin="normal"
            label={"Beds"}
            defaultValue={beds}
            InputProps={{
              readOnly: true,
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            margin="normal"
            label={"Price"}
            defaultValue={price}
            InputProps={{
              readOnly: true,
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            margin="normal"
            label={"Standard"}
            defaultValue={standard}
            InputProps={{
              readOnly: true,
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
      {loading && <CircularProgress />}
      {reservationsForRoom && !loading && (
        <>
          <h2>Reservations for room</h2>
          {reservationsForRoom.map((reservation) => (
            <li
              key={reservation._id}
              onClick={() => navigateToReservationDetails(reservation)}
            >{`${displayDateInString(
              reservation.startTime
            )} - ${displayDateInString(reservation.endTime)}`}</li>
          ))}
        </>
      )}
    </Container>
  );
};

export default RoomDetails;
