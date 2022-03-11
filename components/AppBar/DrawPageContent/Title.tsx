import React from "react";
import CasinoIcon from "@mui/icons-material/Casino";
import { Avatar, ButtonBase, Fade, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useDrawsStore } from "hooks/useDrawsStore";
import { orange } from "@mui/material/colors";
import { EditDrawModal } from "../../EditDrawModal";

export const Title = React.memo(() => {
  const {
    query: { id },
  } = useRouter();
  const draw = useDrawsStore((state) => state.findDrawById(Number(id)));
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
          onClick={() => setEditModalVisible(true)}
        >
          <Avatar sx={{ ml: 0.5, bgcolor: orange[500] }} src={draw?.image_url}>
            <CasinoIcon />
          </Avatar>
          <Typography
            flexGrow={1}
            textAlign="left"
            fontWeight="bold"
            variant="body1"
            mx={1.5}
            overflow="hidden"
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
