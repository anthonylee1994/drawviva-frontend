import { Box } from "@mui/material";
import React from "react";
import { AppBar } from "./AppBar";
import { IndexPageContent } from "./AppBar/IndexPageContent";
import { DrawList } from "./DrawList";

export const MainLayout = React.memo(() => {
  React.useEffect(() => {
    document.body.style.backgroundColor = "#f2f2f2";
  }, []);

  return (
    <Box pb={0.5}>
      <AppBar content={<IndexPageContent />} />
      <DrawList />
    </Box>
  );
});
