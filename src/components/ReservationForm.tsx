import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextFieldProps,
} from "@mui/material";
import React, { FunctionComponent, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { getAllCustomersRequest } from "../features/customers/customersSlice";
import { getAllRoomsRequest } from "../features/rooms/roomsSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { ReservationToSend } from "../types/Reservation";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTime } from "luxon";
import { RequestStatus, StylesType } from "../types";
import { Box } from "@mui/system";

export type ReservationFormData = ReservationToSend;

interface IProps {
  onSubmit: (data: ReservationFormData) => void;
}

const ReservationForm: FunctionComponent<IProps> = ({ onSubmit }) => {
  const dispatch = useAppDispatch();
  const customers = useAppSelector((state) => state.customers.data);
  const rooms = useAppSelector((state) => state.rooms.data);
  const loading = useAppSelector(
    (state) =>
      state.customers.status === RequestStatus.PENDING ||
      state.rooms.status === RequestStatus.PENDING
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ReservationFormData>({
    defaultValues: {
      startTime: DateTime.now().toString(),
      endTime: DateTime.now().toString(),
      customerId: "",
      roomId: "",
    },
  });

  useEffect(() => {
    dispatch(getAllCustomersRequest());
    dispatch(getAllRoomsRequest());
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1>ReservationForm</h1>

      <Controller
        name="startTime"
        control={control}
        render={({ field: { value, onChange }, fieldState }) => (
          <DatePicker
            value={value}
            onChange={onChange}
            label="Start time"
            renderInput={(params: TextFieldProps) => (
              <TextField sx={styles.input} {...params} />
            )}
          />
        )}
      />

      <Controller
        name="endTime"
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <DatePicker
            value={value}
            onChange={onChange}
            label="End time"
            renderInput={(params: TextFieldProps) => (
              <TextField
                sx={styles.input}
                error={!!error?.message}
                {...params}
              />
            )}
          />
        )}
      />

      <FormControl sx={styles.select}>
        <Controller
          control={control}
          rules={{ required: true }}
          name="customerId"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <>
              <InputLabel id="customerId">Customer</InputLabel>
              <Select
                value={value}
                onChange={onChange}
                id="customerId"
                labelId="customerId"
                error={!!error}
              >
                {customers.map((customer) => (
                  <MenuItem
                    value={customer._id}
                  >{`${customer.name} ${customer.lastName}`}</MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {error?.type === "required" && "Filed is required"}
              </FormHelperText>
            </>
          )}
        />
      </FormControl>

      <FormControl sx={styles.select}>
        <Controller
          name="roomId"
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <>
              <InputLabel id="roomId">Room</InputLabel>
              <Select
                value={value}
                onChange={onChange}
                name="roomId"
                id="roomId"
                labelId="roomId"
                error={!!error}
              >
                {rooms.map((room) => (
                  <MenuItem
                    value={room._id}
                  >{`nr: ${room.number} beds: ${room.beds} price: ${room.price} std: ${room.standard}`}</MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {error?.type === "required" && "Filed is required"}
              </FormHelperText>
            </>
          )}
        />
      </FormControl>

      <Button
        sx={styles.button}
        variant="contained"
        onClick={handleSubmit(onSubmit)}
      >
        Submit
      </Button>
    </Box>
  );
};

const styles: StylesType = {
  input: {
    maxWidth: 800,
    marginBottom: 2,
  },
  select: {
    width: 800,
    marginBottom: 2,
  },
  button: {
    display: "flex",
    alignSelf: "center",
  },
};

export default ReservationForm;
