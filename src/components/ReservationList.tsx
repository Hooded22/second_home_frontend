import React, { FunctionComponent } from "react";
import { Reservation } from "../types/Reservation";
import { DateTime } from "luxon";
import ListActionButtons from "./ListActionButtons";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { deleteReservationRequest } from "../features/reservations/reservationsSlice";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

interface IProps {
  data: Reservation[];
}
const ReservationList: FunctionComponent<IProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const removeHandler = (id: Reservation["_id"]) => {
    dispatch(deleteReservationRequest({ id }));
  };

  const editHandler = () => {};

  const showDetailsHandler = () => {};

  return (
    <>
      <Button variant="outlined" onClick={() => navigate("/addReservation")}>
        Add new reservation
      </Button>
      <table>
        <thead>
          <th>Customer</th>
          <th>Start time</th>
          <th>End time</th>
          <th>Status</th>
          <th>Cost</th>
          <th>Room</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{`${item.customer.name} ${item.customer.lastName}`}</td>
              <td>
                {item.startTime
                  ? DateTime.fromJSDate(new Date(item.startTime)).toFormat(
                      "yyyy-MM-dd HH:mm"
                    )
                  : "-"}
              </td>
              <td>
                {item.endTime
                  ? DateTime.fromJSDate(new Date(item.endTime)).toFormat(
                      "yyyy-MM-dd HH:mm"
                    )
                  : "-"}
              </td>
              <td>{item.status}</td>
              <td>{item.cost}</td>
              <td>{item.room.number}</td>
              <td>
                <ListActionButtons
                  onDeleteButtonPress={() => removeHandler(item._id)}
                  onEditButtonPress={editHandler}
                  onShowDetailsButtonPress={showDetailsHandler}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button variant="outlined" onClick={() => navigate("/addReservation")}>
        Add new reservation
      </Button>
    </>
  );
};

export default ReservationList;
