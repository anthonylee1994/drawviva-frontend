import React from "react";
import { Toolbar, AppBar as AppBarBase } from "@mui/material";

interface Props {
  content: React.ReactNode;
}

export const AppBar = React.memo<Props>(({ content }) => {
  return (
    <AppBarBase position="sticky">
      <Toolbar
        sx={{
          justifyContent: "space-between",
          width: "100%",
          maxWidth: 600,
          m: "0 auto",
        }}
      >
        {content}
      </Toolbar>
    </AppBarBase>
  );
});
