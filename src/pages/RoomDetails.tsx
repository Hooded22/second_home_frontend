import { Container, Grid, TextField } from "@mui/material";
import React, { FunctionComponent, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Room } from "../types/Room";

interface IProps {}
const RoomDetails: FunctionComponent<IProps> = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const currentNavigationState = state as { data?: Room };

  useEffect(() => {
    if (!currentNavigationState?.data) {
      navigate("/");
    }
  }, [currentNavigationState?.data, navigate]);

  if (!currentNavigationState.data) {
    return null;
  }

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
    </Container>
  );
};

export default RoomDetails;
