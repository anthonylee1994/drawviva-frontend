import React from "react";
import { Typography } from "@mui/material";
import { amber } from "@mui/material/colors";

export const FormTitle = React.memo(({ children }) => {
  return (
    <Typography
      sx={{ mb: 2, textAlign: "center", color: amber[900] }}
      variant="h6"
      fontWeight="bold"
    >
      {children}
    </Typography>
  );
});
