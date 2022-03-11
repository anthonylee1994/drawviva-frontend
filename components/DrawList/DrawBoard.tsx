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
        borderRadius: 2,
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
      <Avatar src={draw.image_url}>
        <CasinoIcon />
      </Avatar>
      <Typography
        sx={{ ml: 2, whiteSpace: "break-spaces", flexGrow: 1 }}
        variant="body1"
      >
        {draw.name}
      </Typography>
      <Chip
        size="small"
        label={formatMessage({ id: `draw.role.${draw.user_draw.role}` })}
        sx={(theme) => ({
          color: draw.user_draw.role === "admin" ? "white" : undefined,
          bgcolor:
            draw.user_draw.role === "admin"
              ? theme.palette.secondary.main
              : undefined,
        })}
      />
    </Paper>
  );
});
