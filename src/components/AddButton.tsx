import { Button } from "@mui/material";
import React, { FunctionComponent } from "react";

interface IProps {
  onPress: () => void;
  title: string;
}
const AddButton: FunctionComponent<IProps> = ({ onPress, title }) => {
  return (
    <Button
      sx={{ maxWidth: 300, marginTop: 1, marginBottom: 1 }}
      variant="contained"
      onClick={onPress}
    >
      {title}
    </Button>
  );
};

export default AddButton;
