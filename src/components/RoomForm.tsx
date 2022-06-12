import React, { FunctionComponent } from "react";
import { CustomerToSend } from "../types/Customer";
import { Room, RoomStandard, RoomToSend } from "../types/Room";
import { useForm, Controller } from "react-hook-form";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { StylesType } from "../types";
import { useAppSelector } from "../hooks/useAppSelector";

interface IProps {
  onSubmit: (data: RoomToSend) => void;
  defaultData?: Room;
}
const RoomForm: FunctionComponent<IProps> = ({ onSubmit, defaultData }) => {
  const error = useAppSelector((state) => state.rooms.error);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RoomToSend>({
    defaultValues: {
      standard: RoomStandard.STANDARD,
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
      {error && <Alert severity="error">{error}</Alert>}
      <FormControl sx={styles.input}>
        <TextField
          {...register("number", { required: true, min: 1, max: 200 })}
          id="outlined-basic"
          label="Number"
          variant="outlined"
          type="number"
          error={!!errors.number}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormHelperText>
          {errors?.number?.type === "required" && "Field is required"}
          {errors?.number?.type === "min" && "Min value is 1"}
          {errors?.number?.type === "max" && "Max value is 200"}
        </FormHelperText>
      </FormControl>
      <FormControl sx={styles.input}>
        <TextField
          {...register("floor", { required: true, min: 1, max: 4 })}
          id="outlined-basic"
          label="Floor"
          variant="outlined"
          type="number"
          error={!!errors.number}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormHelperText>
          {errors?.floor?.type === "required" && "Field is required"}
          {errors?.floor?.type === "min" && "Min value is 1"}
          {errors?.floor?.type === "max" && "Max value is 4"}
        </FormHelperText>
      </FormControl>
      <FormControl sx={styles.input}>
        <TextField
          {...register("beds", { required: true, min: 1, max: 4 })}
          id="outlined-basic"
          label="Beds"
          variant="outlined"
          type="number"
          error={!!errors.number}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormHelperText>
          {errors?.beds?.type === "required" && "Field is required"}
          {errors?.beds?.type === "min" && "Min value is 1"}
          {errors?.beds?.type === "max" && "Max value is 4"}
        </FormHelperText>
      </FormControl>
      <FormControl sx={styles.input}>
        <Controller
          name="standard"
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <>
              <InputLabel id="standard">Standard</InputLabel>
              <Select
                value={value}
                onChange={onChange}
                name="standard"
                id="standard"
                labelId="standard"
                error={!!error}
              >
                {Object.values(RoomStandard).map((status) => (
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

export default RoomForm;
