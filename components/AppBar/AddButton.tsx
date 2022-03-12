import React from "react";
import { IconButton } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { orange } from "@mui/material/colors";

interface Props {
  onClick: () => void;
}

export const AddButton = React.memo<Props>(({ onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      sx={(theme) => ({
        ml: 1,
        mr: 0,
        width: theme.spacing(6),
        height: theme.spacing(6),
        bgcolor: `white !important`,
        color: orange[700],
        [theme.breakpoints.down("sm")]: {
          width: theme.spacing(5),
          height: theme.spacing(5),
        },
      })}
    >
      <AddIcon
        sx={(theme) => ({
          fontSize: 28,
          [theme.breakpoints.down("sm")]: {
            fontSize: 24,
          },
        })}
      />
    </IconButton>
  );
});
