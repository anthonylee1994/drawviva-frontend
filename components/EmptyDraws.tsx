import { Casino as CasinoIcon } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { FormattedMessage } from "react-intl";

export const EmptyDraws = React.memo(() => {
  return (
    <Box
      width="100%"
      height="50vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <CasinoIcon sx={{ fontSize: "120px !important", color: "grey.400" }} />
      <Typography mt={2} variant="h6" color="grey.800">
        <FormattedMessage id="no.draw" />
      </Typography>
    </Box>
  );
});
