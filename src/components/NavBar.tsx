import {
  AppBar,
  Box,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { FunctionComponent } from "react";
import { logoutUser } from "../features/users/usersSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { StylesType } from "../types";

interface IProps {
  title: string;
}
const NavBar: FunctionComponent<IProps> = ({ title }) => {
  const dispatch = useAppDispatch();
  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Button onClick={logoutHandler} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
