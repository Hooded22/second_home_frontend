import { Container } from "@mui/material";
import React, { FunctionComponent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RoomForm from "../components/RoomForm";
import { addRoomRequst } from "../features/rooms/roomsSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { RequestStatus } from "../types";
import { RoomToSend } from "../types/Room";

interface IProps {}
const AddRoomPage: FunctionComponent<IProps> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const addRoomCompleted = useAppSelector(
    (state) => state.rooms.addRoomStatus === RequestStatus.SUCCESSFULL
  );

  const onSubmit = (data: RoomToSend) => {
    dispatch(addRoomRequst(data));
  };

  useEffect(() => {
    if (addRoomCompleted) {
      navigate("/");
    }
  }, [addRoomCompleted, navigate]);

  return (
    <Container
      sx={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1>Add new reservation</h1>
      <RoomForm onSubmit={onSubmit} />
    </Container>
  );
};

export default AddRoomPage;
