import {
  Box,
  Button,
  FormControl,
  TextField,
  FormHelperText,
  TextFieldProps,
} from "@mui/material";
import React, { FunctionComponent } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { Customer, CustomerToSend } from "../types/Customer";
import { useForm, Controller } from "react-hook-form";
import { StylesType } from "../types";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTime } from "luxon";
import { useAppSelector } from "../hooks/useAppSelector";
import { Error } from "@mui/icons-material";

interface IProps {
  onSubmit: (data: CustomerToSend) => void;
  defaultData?: Customer;
}
const CustomerForm: FunctionComponent<IProps> = ({ onSubmit, defaultData }) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CustomerToSend>({
    defaultValues: {
      birthDate: DateTime.now().minus({ year: 1 }).toJSDate(),
      ...defaultData,
    },
  });
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1>CustomerForm</h1>

      <FormControl sx={styles.input}>
        <TextField
          {...register("name", { required: true, min: 3, max: 200 })}
          id="outlined-basic"
          label="First name"
          variant="outlined"
          type="text"
          error={!!errors.name}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormHelperText>
          {errors?.name?.type === "required" && "Field is required"}
          {errors?.name?.type === "min" && "Min 3 characters required"}
          {errors?.name?.type === "max" && "Max 200 characters allowed"}
        </FormHelperText>
      </FormControl>

      <FormControl sx={styles.input}>
        <TextField
          {...register("lastName", { required: true, min: 3, max: 200 })}
          id="outlined-basic"
          label="Last name"
          variant="outlined"
          error={!!errors.lastName}
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormHelperText>
          {errors?.lastName?.type === "required" && "Field is required"}
          {errors?.lastName?.type === "min" && "Min 3 characters required"}
          {errors?.lastName?.type === "max" && "Max 200 characters allowed"}
        </FormHelperText>
      </FormControl>

      <Controller
        name="birthDate"
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <DatePicker
            maxDate={new Date()}
            value={value}
            onChange={onChange}
            label="Birth date"
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
  button: {
    display: "flex",
    alignSelf: "center",
  },
};

export default CustomerForm;
