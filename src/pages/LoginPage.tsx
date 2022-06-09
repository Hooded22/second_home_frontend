import { Container } from "@mui/material";
import React, { FunctionComponent } from "react";
import LoginForm from "../components/LoginForm/LoginForm";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { RequestStatus, StylesType } from "../types";
import { useForm } from "react-hook-form";
import { LoginFormData } from "../components/LoginForm/types";
import { useAppSelector } from "../hooks/useAppSelector";
import { getUserDetails } from "../features/users/usersSlice";
import { Navigate } from "react-router-dom";

interface IProps {}

const LoginPage: FunctionComponent<IProps> = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.users.user);
  const token = useAppSelector((state) => state.users.token);
  const statusOfRequest = useAppSelector((state) => state.users.status);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    dispatch(getUserDetails({ email: data.email, password: data.password }));
  };

  if (user && token) {
    return <Navigate to="/" />;
  }

  return (
    <Container fixed sx={styles.container}>
      <h1>Login to system</h1>
      <LoginForm onSubmit={handleSubmit(onSubmit)} register={register} />
      {statusOfRequest && statusOfRequest === RequestStatus.PENDING && (
        <h3>Loading...</h3>
      )}
    </Container>
  );
};

const styles: StylesType = {
  container: {
    alignItems: "center",
    marginTop: 10,
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
};

export default LoginPage;
