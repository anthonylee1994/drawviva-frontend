import React from "react";
import { Box } from "@mui/material";
import { DrawItemList } from "components/DrawItemList";
import { DeleteDrawButton } from "./DeleteDrawButton";
import { LuckyPickButton } from "./LuckyPickButton";

export const DrawContent = React.memo(() => {
  return (
    <Box p={2} maxWidth={600} m="0 auto">
      <DrawItemList />
      <LuckyPickButton />
      <DeleteDrawButton />
    </Box>
  );
});
