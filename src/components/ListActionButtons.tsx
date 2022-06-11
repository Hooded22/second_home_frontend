import { Delete, Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { FunctionComponent } from "react";
import { StylesType } from "../types";

interface IProps {
  onEditButtonPress: () => void;
  onDeleteButtonPress: () => void;
  onShowDetailsButtonPress: () => void;
}
const ListActionButtons: FunctionComponent<IProps> = ({
  onDeleteButtonPress,
  onEditButtonPress,
  onShowDetailsButtonPress,
}) => {
  return (
    <Box sx={styles.container}>
      <Edit onClick={onEditButtonPress} />
      <Delete onClick={onDeleteButtonPress} />
      <Button variant="outlined" onClick={onShowDetailsButtonPress}>
        Show details
      </Button>
    </Box>
  );
};

const styles: StylesType = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

export default ListActionButtons;
