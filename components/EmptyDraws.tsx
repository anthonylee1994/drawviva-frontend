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
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
    >
      <CasinoIcon
        sx={(theme) => ({
          fontSize: "168px !important",
          color: "grey.400",
          [theme.breakpoints.down("sm")]: {
            fontSize: "120px !important",
          },
        })}
      />
      <Typography
        mt={2}
        variant="h6"
        color="grey.800"
        sx={(theme) => ({
          fontSize: 24,
          [theme.breakpoints.down("sm")]: {
            fontSize: 20,
          },
        })}
      >
        <FormattedMessage id="no.draw" />
      </Typography>
    </Box>
  );
});
