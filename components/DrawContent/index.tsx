import React from "react";
import { Box } from "@mui/material";
import { DrawItemList } from "components/DrawItemList";
import { DeleteDrawButton } from "./DeleteDrawButton";

export const DrawContent = React.memo(() => {
  return (
    <Box p={2}>
      <DrawItemList />
      <DeleteDrawButton />
    </Box>
  );
});
