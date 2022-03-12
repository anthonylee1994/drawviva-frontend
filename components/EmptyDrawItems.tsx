import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { Category as CategoryIcon } from "@mui/icons-material";

export const EmptyDrawItems = React.memo(() => {
  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={(theme) => ({
        mt: 4,
        mb: 6,
        [theme.breakpoints.down("sm")]: {
          mt: 2,
          mb: 4,
        },
      })}
    >
      <CategoryIcon
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
        variant="body1"
        color="grey.800"
        sx={(theme) => ({
          fontSize: 18,
          [theme.breakpoints.down("sm")]: {
            fontSize: 16,
          },
        })}
      >
        <FormattedMessage id="no.draw.items" />
      </Typography>
    </Box>
  );
});
