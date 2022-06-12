import { CircularProgress, Container, Grid, TextField } from "@mui/material";
import React, { FunctionComponent, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Customer } from "../types/Customer";
import { DateTime } from "luxon";
import { getReservationsForCustomerIdRequest } from "../features/reservations/reservationsSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { RequestStatus } from "../types";
import { displayDateInString } from "../utils/utils";
import { Reservation } from "../types/Reservation";

interface IProps {}
const CustomerDetails: FunctionComponent<IProps> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const currentNavigationState = state as { data?: Customer };
  const loading = useAppSelector(
    (state) => state.reservations.status === RequestStatus.PENDING
  );
  const reservationsForCustomer = useAppSelector(
    (state) => state.reservations.data
  );

  useEffect(() => {
    if (!currentNavigationState?.data) {
      navigate("/");
    } else {
      dispatch(
        getReservationsForCustomerIdRequest({
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

  const { name, lastName, birthDate } = currentNavigationState.data;

  return (
    <Container
      sx={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h2>Customer details</h2>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField
            margin="normal"
            label={"Firt name"}
            defaultValue={name}
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
            label={"Last name"}
            defaultValue={lastName}
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
            label={"Birth date"}
            defaultValue={DateTime.fromJSDate(new Date(birthDate)).toFormat(
              "yyyy-MM-dd"
            )}
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
      {reservationsForCustomer && !loading && (
        <>
          <h2>Reservations for room</h2>
          {reservationsForCustomer.map((reservation) => (
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

export default CustomerDetails;
