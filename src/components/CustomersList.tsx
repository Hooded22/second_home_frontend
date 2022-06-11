import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import React, { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { Customer } from "../types/Customer";
import ListActionButtons from "./ListActionButtons";
import { DateTime } from "luxon";
import AddButton from "./AddButton";
import { deleteCustomerRequest } from "../features/customers/customersSlice";

interface IProps {
  data: Customer[];
}
const CustomersList: FunctionComponent<IProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const removeHandler = (id: Customer["_id"]) => {
    dispatch(deleteCustomerRequest({ id }));
  };

  const editHandler = (customerToEdit: Customer) => {};

  const showDetailsHandler = (customer: Customer) => {
    navigate("/customerDetials", { state: { data: customer } });
  };
  return (
    <>
      <h2>Customers</h2>
      <AddButton
        onPress={() => navigate("/addCustomer")}
        title="Add new customer"
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First name</TableCell>
              <TableCell>Last name</TableCell>
              <TableCell>Birth date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.lastName}</TableCell>
                <TableCell>
                  {DateTime.fromJSDate(new Date(item.birthDate)).toFormat(
                    "yyyy-MM-dd"
                  )}
                </TableCell>

                <TableCell>
                  <ListActionButtons
                    onDeleteButtonPress={() => removeHandler(item._id)}
                    onEditButtonPress={() => editHandler(item)}
                    onShowDetailsButtonPress={() => showDetailsHandler(item)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddButton
        onPress={() => navigate("/addCustomer")}
        title="Add new customer"
      />
    </>
  );
};

export default CustomersList;
