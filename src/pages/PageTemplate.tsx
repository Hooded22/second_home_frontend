import React, { FunctionComponent } from "react";
import NavBar from "../components/NavBar";

interface IProps {
  pageName: string;
  children: JSX.Element;
}
const PageTemplate: FunctionComponent<IProps> = ({ pageName, children }) => {
  return (
    <>
      <NavBar title={pageName} />
      {children}
    </>
  );
};

export default PageTemplate;
