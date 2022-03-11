import { Button } from "@mui/material";
import React from "react";

interface Props {
  disabled?: boolean;
  children: React.ReactNode;
}

export const FormSubmitButton = React.memo<Props>(({ disabled, children }) => {
  return (
    <Button
      fullWidth
      type="submit"
      size="large"
      disableElevation
      variant="contained"
      sx={{ mt: 2, color: "white", borderRadius: 5 }}
      color="secondary"
      disabled={disabled}
    >
      {children}
    </Button>
  );
});
