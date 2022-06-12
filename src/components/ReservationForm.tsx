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
import React, { FunctionComponent, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { getAllCustomersRequest } from "../features/customers/customersSlice";
import { getAllRoomsRequest } from "../features/rooms/roomsSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import {
  Reservation,
  ReservationStatuses,
  ReservationToSend,
} from "../types/Reservation";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTime } from "luxon";
import { RequestStatus, StylesType } from "../types";
import { Box } from "@mui/system";

export type ReservationFormData = ReservationToSend;

const getMinDateFormEndTime = (startTime: ReservationFormData["startTime"]) => {
  return DateTime.fromJSDate(new Date(startTime)).plus({ day: 1 }).toJSDate();
};
interface IProps {
  onSubmit: (data: ReservationFormData) => void;
  defaultData?: Reservation;
}

const ReservationForm: FunctionComponent<IProps> = ({
  onSubmit,
  defaultData,
}) => {
  const dispatch = useAppDispatch();
  const customers = useAppSelector((state) => state.customers.data);
  const rooms = useAppSelector((state) => state.rooms.data);
  const loading = useAppSelector(
    (state) =>
      state.customers.status === RequestStatus.PENDING ||
      state.rooms.status === RequestStatus.PENDING
  );

  const [minEndTime, setMinEndTIme] = useState<Date>(
    getMinDateFormEndTime(new Date().toString())
  );

  const defaultFormData: Partial<ReservationToSend> = defaultData
    ? {
        ...defaultData,
        customerId: defaultData.customer?._id,
        roomId: defaultData.room?._id,
      }
    : {
        startTime: DateTime.now().toString(),
        endTime: minEndTime.toString(),
        customerId: "",
        roomId: "",
      };

  const { handleSubmit, control } = useForm<ReservationFormData>({
    defaultValues: defaultFormData,
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
      <Controller
        name="startTime"
        control={control}
        render={({ field: { value, onChange }, fieldState }) => (
          <DatePicker
            minDate={new Date()}
            value={value}
            onChange={(newVal) => {
              newVal && setMinEndTIme(getMinDateFormEndTime(newVal.toString()));
              onChange(newVal);
            }}
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
            minDate={minEndTime}
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

      {defaultData?.status && (
        <FormControl sx={styles.select}>
          <Controller
            name="status"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <>
                <InputLabel id="status">Room</InputLabel>
                <Select
                  value={value}
                  onChange={onChange}
                  name="status"
                  id="status"
                  labelId="status"
                  error={!!error}
                >
                  {Object.values(ReservationStatuses).map((status) => (
                    <MenuItem value={status}>{status}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {error?.type === "required" && "File is required"}
                </FormHelperText>
              </>
            )}
          />
        </FormControl>
      )}

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
