import { Container } from "@mui/material";
import React, { FunctionComponent, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RoomForm from "../components/RoomForm";
import { editReservationRequest } from "../features/reservations/reservationsSlice";
import { editRoomRequest } from "../features/rooms/roomsSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { RequestStatus } from "../types";
import { Room, RoomToSend } from "../types/Room";

interface IProps {}
const EditRoomPage: FunctionComponent<IProps> = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useAppDispatch();
  const currentNavigationState = state as { data?: Room };
  const editCompleted = useAppSelector(
    (state) => state.rooms.editRoomStatus === RequestStatus.SUCCESSFULL
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

  const onSubmit = (data: RoomToSend) => {
    if (!currentNavigationState.data?._id) {
      return;
    }
    dispatch(editRoomRequest({ data, id: currentNavigationState.data._id }));
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
      <h1>Add new reservation</h1>
      <RoomForm onSubmit={onSubmit} defaultData={currentNavigationState.data} />
    </Container>
  );
};

export default EditRoomPage;
