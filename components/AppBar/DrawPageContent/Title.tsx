import React from "react";
import CasinoIcon from "@mui/icons-material/Casino";
import { Avatar, ButtonBase, Fade, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useDrawsStore } from "hooks/useDrawsStore";
import { orange } from "@mui/material/colors";
import { EditDrawModal } from "../../EditDrawModal";
import { useAdminCheck } from "hooks/useAdminCheck";

export const Title = React.memo(() => {
  const {
    query: { id },
  } = useRouter();
  const draw = useDrawsStore((state) => state.findDrawById(Number(id)));
  const isAdmin = useAdminCheck();

  const [isEditModalVisible, setEditModalVisible] = React.useState(false);

  return (
    <React.Fragment>
      <Fade in>
        <ButtonBase
          sx={{
            display: "flex",
            flexGrow: 1,
            alignItems: "center",
            borderRadius: 1,
          }}
          disabled={!isAdmin}
          onClick={() => setEditModalVisible(true)}
        >
          <Avatar
            sx={(theme) => ({
              ml: 0.5,
              bgcolor: orange[500],
              width: theme.spacing(6),
              height: theme.spacing(6),
              [theme.breakpoints.down("sm")]: {
                width: theme.spacing(5),
                height: theme.spacing(5),
              },
            })}
            src={draw?.image_url}
          >
            <CasinoIcon />
          </Avatar>
          <Typography
            flexGrow={1}
            textAlign="left"
            fontWeight="bold"
            variant="body1"
            mx={1.5}
            overflow="hidden"
            sx={(theme) => ({
              fontSize: 20,
              [theme.breakpoints.down("sm")]: {
                fontSize: 16,
              },
            })}
          >
            {draw?.name}
          </Typography>
        </ButtonBase>
      </Fade>
      <EditDrawModal
        draw={draw}
        visible={isEditModalVisible}
        onClose={() => setEditModalVisible(false)}
      />
    </React.Fragment>
  );
});
