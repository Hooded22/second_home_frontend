import React, { FunctionComponent } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import { UserRoles } from "../types/User";

interface IProps {
  children: JSX.Element;
  allowJustLogin?: boolean;
}
const ProtectedPage: FunctionComponent<IProps> = ({
  children,
  allowJustLogin,
}) => {
  const token = useAppSelector((state) => state.users.token);
  const role = useAppSelector((state) => state.users.user?.role);
  if (allowJustLogin) {
    if (!token) {
      return <Navigate to={"/login"} />;
    } else {
      return children;
    }
  }
  if (!token || !role || role !== UserRoles.MANAGER) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default ProtectedPage;
