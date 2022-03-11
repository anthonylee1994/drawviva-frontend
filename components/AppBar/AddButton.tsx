import React from "react";
import { IconButton } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { orange } from "@mui/material/colors";

interface Props {
  onClick: () => void;
}

export const AddButton = React.memo<Props>(({ onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      sx={{ ml: 1, mr: 0, bgcolor: `white !important`, color: orange[700] }}
    >
      <AddIcon />
    </IconButton>
  );
});
