import React from "react";
import { Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";

export const Title = React.memo(() => {
  return (
    <Typography fontWeight="bold" variant="h5">
      <FormattedMessage id="app.caption" />
    </Typography>
  );
});
