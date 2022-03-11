import { Category as CategoryIcon } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { FormattedMessage } from "react-intl";

export const EmptyDrawItems = React.memo(() => {
  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      mt={2}
      mb={4}
    >
      <CategoryIcon sx={{ fontSize: "120px !important", color: "grey.400" }} />
      <Typography mt={2} variant="body1" color="grey.800">
        <FormattedMessage id="no.draw.items" />
      </Typography>
    </Box>
  );
});
