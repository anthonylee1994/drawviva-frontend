import { Avatar, Chip, Paper, Typography } from "@mui/material";
import React from "react";
import { Draw } from "types/Draw";
import CasinoIcon from "@mui/icons-material/Casino";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";

interface Props {
  draw: Draw;
}

export const DrawBoard = React.memo<Props>(({ draw }) => {
  const { formatMessage } = useIntl();
  const router = useRouter();

  const onClick = React.useCallback(() => {
    router.push(`/draws/${draw.id}`);
  }, [draw.id, router]);

  return (
    <Paper
      elevation={2}
      sx={{
        cursor: "pointer",
        m: 1.5,
        p: 2,
        bgcolor: "white",
        borderRadius: 5,
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        transition: "0.2s ease-in-out",
        "&:active": {
          transform: "scale(0.9)",
        },
      }}
      onClick={onClick}
    >
      <Avatar
        src={draw.image_url}
        sx={(theme) => ({
          width: theme.spacing(8),
          height: theme.spacing(8),
          transition: "0.2s ease-in-out",
          [theme.breakpoints.down("sm")]: {
            width: theme.spacing(6),
            height: theme.spacing(6),
          },
        })}
      >
        <CasinoIcon />
      </Avatar>
      <Typography
        variant="body1"
        sx={(theme) => ({
          ml: 2,
          whiteSpace: "break-spaces",
          flexGrow: 1,
          fontSize: 18,
          [theme.breakpoints.down("sm")]: {
            fontSize: 16,
          },
        })}
      >
        {draw.name}
      </Typography>
      <Chip
        size="small"
        label={formatMessage({ id: `draw.role.${draw.user_draw.role}` })}
        sx={(theme) => ({
          fontSize: 16,
          px: 1,
          py: 2,
          color: draw.user_draw.role === "admin" ? "white" : undefined,
          bgcolor:
            draw.user_draw.role === "admin"
              ? theme.palette.secondary.main
              : undefined,
          [theme.breakpoints.down("sm")]: {
            fontSize: 14,
            px: 0.5,
            py: 1,
          },
        })}
      />
    </Paper>
  );
});
