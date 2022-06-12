import { Container } from "@mui/material";
import React, { FunctionComponent, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomerForm from "../components/CustomerForm";
import { editCustomerRequest } from "../features/customers/customersSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { RequestStatus } from "../types";
import { Customer, CustomerToSend } from "../types/Customer";

interface IProps {}
const EditCustomerPage: FunctionComponent<IProps> = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useAppDispatch();
  const currentNavigationState = state as { data?: Customer };
  const editCompleted = useAppSelector(
    (state) => state.customers.editCustomerStatus === RequestStatus.SUCCESSFULL
  );

  useEffect(() => {
    if (!currentNavigationState?.data) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (editCompleted) {
      navigate("/");
    }
  }, [editCompleted, navigate]);

  const onSubmit = (data: CustomerToSend) => {
    if (!currentNavigationState.data?._id) {
      return;
    }
    dispatch(
      editCustomerRequest({ data, id: currentNavigationState.data._id })
    );
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
      <CustomerForm
        onSubmit={onSubmit}
        defaultData={currentNavigationState.data}
      />
    </Container>
  );
};

export default EditCustomerPage;
