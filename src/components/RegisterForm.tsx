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

interface IProps {}
const RegisterForm: FunctionComponent<IProps> = () => {
  return (
    <Box sx={styles.box}>
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="outlined-basic"
        label="Surname"
        variant="outlined"
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
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
        id="outlined-basic"
        label="Password"
        variant="outlined"
        margin="normal"
        type="password"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="outlined-basic"
        label="Confirm password"
        variant="outlined"
        margin="normal"
        type="password"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button variant="contained">Sign in</Button>
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

export default RegisterForm;
