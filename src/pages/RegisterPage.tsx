import { Container, createStyles } from "@mui/material";
import React, { FunctionComponent } from "react";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import { StylesType } from "../types";

interface IProps {}
const RegisterPage: FunctionComponent<IProps> = () => {
  return (
    <Container fixed sx={styles.container}>
      <h1>Create account</h1>
      <RegisterForm />
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

export default RegisterPage;
