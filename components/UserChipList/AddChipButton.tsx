import React from "react";
import { Chip } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useIntl } from "react-intl";

export const AddChipButton = React.memo(() => {
  const { formatMessage } = useIntl();

  return (
    <Chip
      sx={{ m: 0.5 }}
      clickable
      onClick={() => {}}
      avatar={<AddIcon />}
      label={formatMessage({ id: "draw.users.add" })}
    />
  );
});
