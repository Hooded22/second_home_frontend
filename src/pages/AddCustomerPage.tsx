import { Container } from "@mui/material";
import React, { FunctionComponent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomerForm from "../components/CustomerForm";
import { addCustomerRequest } from "../features/customers/customersSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { RequestStatus } from "../types";
import { CustomerToSend } from "../types/Customer";

interface IProps {}
const AddCustomerPage: FunctionComponent<IProps> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const addCustomerCompleted = useAppSelector(
    (state) => state.customers.addCustomerStatus === RequestStatus.SUCCESSFULL
  );

  useEffect(() => {
    if (addCustomerCompleted) {
      navigate("/");
    }
  }, [addCustomerCompleted, navigate]);

  const onSubmit = (data: CustomerToSend) => {
    console.log("DATA: ", data);
    dispatch(addCustomerRequest(data));
  };

  return (
    <Container
      sx={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1>Add new customer</h1>
      <CustomerForm onSubmit={onSubmit} />
    </Container>
  );
};

export default AddCustomerPage;
