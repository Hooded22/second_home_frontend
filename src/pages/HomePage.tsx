import React, { FunctionComponent, useEffect } from "react";
import ReservationList from "../components/ReservationList";
import { getAllReservationsRequest } from "../features/reservations/reservationsSlice";
import { logoutUser } from "../features/users/usersSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";

interface IProps {}
const HomePage: FunctionComponent<IProps> = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.reservations.data);

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    dispatch(getAllReservationsRequest());
  }, []);

  console.log("DATA: ", data);

  return (
    <div>
      <h1>HomePage 123</h1>
      <button type="button" onClick={logoutHandler}>
        Logout
      </button>
      <ReservationList data={data} />
    </div>
  );
};

export default HomePage;
