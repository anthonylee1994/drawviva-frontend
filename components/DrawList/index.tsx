import { Box } from "@mui/material";
import { EmptyDraws } from "components/EmptyDraws";
import { useDrawsStore } from "hooks/useDrawsStore";
import React from "react";
import { DrawBoard } from "./DrawBoard";

export const DrawList = React.memo(() => {
  const fetchDraws = useDrawsStore((state) => state.fetchDraws);
  const draws = useDrawsStore((state) => state.draws);

  React.useEffect(() => {
    fetchDraws();
  }, [fetchDraws]);

  if (draws.length === 0) {
    return <EmptyDraws />;
  }

  return (
    <Box
      sx={(theme) => ({
        maxWidth: 600,
        margin: `${theme.spacing(2)} auto`,
        [theme.breakpoints.down("sm")]: {
          margin: `${theme.spacing(0)} auto`,
        },
      })}
    >
      {draws.map((draw, key) => (
        <DrawBoard key={key} draw={draw} />
      ))}
    </Box>
  );
});
