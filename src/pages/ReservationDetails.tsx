import { Container, Grid, TextField } from "@mui/material";
import { FunctionComponent, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Reservation } from "../types/Reservation";
import { displayDateInString } from "../utils/utils";

interface IProps {}
const ReservationDetails: FunctionComponent<IProps> = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const currentNavigationState = state as { data?: Reservation };

  useEffect(() => {
    if (!currentNavigationState?.data) {
      navigate("/");
    }
  }, [currentNavigationState?.data, navigate]);

  if (!currentNavigationState.data) {
    return null;
  }

  const {
    cost,
    customer: { lastName, name },
    endTime,
    startTime,
    status,
    room: { beds, floor, number, price, standard },
  } = currentNavigationState.data;

  const sections = [
    {
      sectionName: "Reservation",
      items: [
        { value: cost, title: "Cost" },
        { value: displayDateInString(startTime), title: "Start time" },
        { value: displayDateInString(endTime), title: "End time" },
        { value: status, title: "status" },
      ],
    },
    {
      sectionName: "Customer",
      items: [
        { value: name, title: "First name" },
        { value: lastName, title: "Last name" },
      ],
    },
    {
      sectionName: "Room",
      items: [
        { value: number, title: "Room number" },
        { value: beds, title: "Beds count" },
        { value: floor, title: "Floor" },
        { value: price, title: "Price" },
        { value: standard, title: "Standard" },
      ],
    },
  ];

  return (
    <Container
      sx={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h2>Reservation</h2>
      {sections.map((section) => (
        <>
          <h2>{section.sectionName}</h2>
          <Grid container spacing={2}>
            {section.items.map((item) => (
              <Grid item xs={3}>
                <TextField
                  margin="normal"
                  label={item.title}
                  defaultValue={item.value}
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </>
      ))}
    </Container>
  );
};

export default ReservationDetails;
