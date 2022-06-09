import React, { FunctionComponent } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";

interface IProps {
  children: JSX.Element;
}
const ProtectedPage: FunctionComponent<IProps> = ({ children }) => {
  const token = useAppSelector((state) => state.users.token);
  if (!token) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default ProtectedPage;
