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
import { deleteRoomRequest } from "../features/rooms/roomsSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { Room } from "../types/Room";
import AddButton from "./AddButton";
import ListActionButtons from "./ListActionButtons";

interface IProps {
  data: Room[];
}
const RoomsList: FunctionComponent<IProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const removeHandler = (id: Room["_id"]) => {
    dispatch(deleteRoomRequest({ id }));
  };

  const editHandler = (roomToEdit: Room) => {
    navigate("/editRoom", { state: { data: roomToEdit } });
  };

  const showDetailsHandler = (room: Room) => {
    navigate("/roomDetails", { state: { data: room } });
  };
  return (
    <>
      <h2>Rooms</h2>
      <AddButton onPress={() => navigate("/addRoom")} title="Add new room" />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Number</TableCell>
              <TableCell>Floor</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Beds</TableCell>
              <TableCell>Standard</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.number}</TableCell>
                <TableCell>{item.floor}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.beds}</TableCell>
                <TableCell>{item.standard}</TableCell>
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
      <AddButton onPress={() => navigate("/addRoom")} title="Add new room" />
    </>
  );
};

export default RoomsList;
