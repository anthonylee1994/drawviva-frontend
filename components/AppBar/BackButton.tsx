import React from "react";
import { IconButton, Zoom } from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";

interface Props {
  onClick: () => void;
}

export const BackButton = React.memo<Props>(({ onClick }) => {
  return (
    <Zoom in>
      <IconButton size="small" onClick={onClick} sx={{ ml: -1 }}>
        <ArrowBackIcon />
      </IconButton>
    </Zoom>
  );
});
