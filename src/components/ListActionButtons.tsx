import React, { FunctionComponent } from "react";

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
    <div>
      <button onClick={onEditButtonPress}>Edit</button>
      <button onClick={onDeleteButtonPress}>Delete</button>
      <button onClick={onShowDetailsButtonPress}>Show details</button>
    </div>
  );
};

export default ListActionButtons;
