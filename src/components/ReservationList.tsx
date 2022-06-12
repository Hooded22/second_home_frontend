import { FunctionComponent } from "react";
import { Reservation } from "../types/Reservation";
import { DateTime } from "luxon";
import ListActionButtons from "./ListActionButtons";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { deleteReservationRequest } from "../features/reservations/reservationsSlice";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AddButton from "./AddButton";
interface IProps {
  data: Reservation[];
}
const ReservationList: FunctionComponent<IProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const removeHandler = (id: Reservation["_id"]) => {
    dispatch(deleteReservationRequest({ id }));
  };

  const editHandler = (reservationToEdit: Reservation) => {
    navigate("/editReservation", { state: { data: reservationToEdit } });
  };

  const showDetailsHandler = (reservation: Reservation) => {
    navigate("/reservationDetails", { state: { data: reservation } });
  };

  return (
    <>
      <h2>Reservations</h2>
      <AddButton
        onPress={() => navigate("/addReservation")}
        title="Add new reservation"
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Start time</TableCell>
              <TableCell>End time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Room</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item._id}>
                <TableCell>
                  {item.customer
                    ? `${item.customer?.name} ${item.customer?.lastName}`
                    : "-"}
                </TableCell>
                <TableCell>
                  {item.startTime
                    ? DateTime.fromJSDate(new Date(item.startTime)).toFormat(
                        "yyyy-MM-dd HH:mm"
                      )
                    : "-"}
                </TableCell>
                <TableCell>
                  {item.endTime
                    ? DateTime.fromJSDate(new Date(item.endTime)).toFormat(
                        "yyyy-MM-dd HH:mm"
                      )
                    : "-"}
                </TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.cost}</TableCell>
                <TableCell>{item.room?.number || "-"}</TableCell>
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
        onPress={() => navigate("/addReservation")}
        title="Add new reservation"
      />
    </>
  );
};

export default ReservationList;
