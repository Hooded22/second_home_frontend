import { Container, Grid, TextField } from "@mui/material";
import React, { FunctionComponent, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Customer } from "../types/Customer";
import { DateTime } from "luxon";

interface IProps {}
const CustomerDetails: FunctionComponent<IProps> = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const currentNavigationState = state as { data?: Customer };

  useEffect(() => {
    if (!currentNavigationState?.data) {
      navigate("/");
    }
  }, [currentNavigationState?.data, navigate]);

  if (!currentNavigationState.data) {
    return null;
  }

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
    </Container>
  );
};

export default CustomerDetails;
