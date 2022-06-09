import {
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  TextField,
  SxProps,
  Theme,
} from "@mui/material";
import React, { FunctionComponent } from "react";
import { UseFormRegister } from "react-hook-form";
import { LoginFormData } from "./types";

interface IProps {
  onSubmit: () => void;
  register: UseFormRegister<LoginFormData>;
}

const LoginForm: FunctionComponent<IProps> = ({ onSubmit, register }) => {
  return (
    <Box sx={styles.box}>
      <TextField
        {...register("email")}
        id="outlined-basic"
        label="E-mail"
        variant="outlined"
        margin="normal"
        type="email"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        {...register("password")}
        id="outlined-basic"
        label="Password"
        variant="outlined"
        margin="normal"
        type="password"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button variant="contained" onClick={onSubmit}>
        Log in
      </Button>
    </Box>
  );
};

const styles: { [key in string]: SxProps<Theme> } = {
  box: {
    flexDirection: "column",
    display: "flex",
    flex: 1,
    minWidth: 400,
    backgroundColor: "primary.dark",
    borderRadius: 2,
    padding: 3,
  },
};

export default LoginForm;
