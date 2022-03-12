import React from "react";
import { Drawer } from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const BottomDrawer = React.memo<Props>(({ open, onClose, children }) => {
  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: (theme) => ({
          maxWidth: 400,
          margin: "0 auto",
          borderTopLeftRadius: theme.spacing(2),
          borderTopRightRadius: theme.spacing(2),
          pb: "env(safe-area-inset-bottom)",
        }),
      }}
    >
      {children}
    </Drawer>
  );
});
