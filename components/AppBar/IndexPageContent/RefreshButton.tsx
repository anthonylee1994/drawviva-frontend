import React from "react";
import { IconButton, Zoom } from "@mui/material";
import { Refresh as RefreshIcon } from "@mui/icons-material";
import { useDrawsStore } from "hooks/useDrawsStore";

export const RefreshButton = React.memo(() => {
  const isLoading = useDrawsStore((state) => state.isLoading);
  const fetchDraws = useDrawsStore((state) => state.fetchDraws);

  return (
    <Zoom in>
      <IconButton
        disabled={isLoading}
        size="small"
        onClick={fetchDraws}
        sx={{ ml: -1, mr: 0.5 }}
      >
        <RefreshIcon />
      </IconButton>
    </Zoom>
  );
});
