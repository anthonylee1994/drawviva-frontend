import { Box } from "@mui/material";
import { UserChipList } from "components/UserChipList";
import React from "react";
import { DeleteDrawButton } from "./DeleteDrawButton";

export const DrawContent = React.memo(() => {
  return (
    <Box p={2}>
      <DeleteDrawButton />
    </Box>
  );
});
