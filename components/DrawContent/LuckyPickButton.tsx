import React from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Zoom,
} from "@mui/material";
import { FormattedMessage } from "react-intl";
import {
  Casino as CasinoIcon,
  Category as CategoryIcon,
} from "@mui/icons-material";
import { useAdminCheck } from "hooks/useAdminCheck";
import { useDrawItems } from "hooks/drawItems/useDrawItems";
import { useRouter } from "next/router";
import { useDrawItemsStore } from "hooks/useDrawItemsStore";
import { brown } from "@mui/material/colors";

export const LuckyPickButton = React.memo(() => {
  const {
    query: { id },
  } = useRouter();

  const isAdmin = useAdminCheck();
  const drawItems = useDrawItems(Number(id));
  const luckyPicking = useDrawItemsStore((state) => state.luckyPicking);
  const luckyPick = useDrawItemsStore((state) => state.luckyPick);
  const luckyPickedItem = useDrawItemsStore((state) => state.luckyPickedItem);
  const clearPickedItem = useDrawItemsStore((state) => state.clearPickedItem);
  const [modalVisible, setModalVisible] = React.useState(false);

  const openModal = React.useCallback(() => {
    setModalVisible(true);
  }, []);

  const closeModal = React.useCallback(() => {
    clearPickedItem();
    setModalVisible(false);
  }, [clearPickedItem]);

  React.useEffect(() => {
    if (luckyPickedItem) {
      openModal();
    }
  }, [luckyPickedItem, openModal]);

  if (!isAdmin || drawItems.length === 0) {
    return null;
  }

  return (
    <React.Fragment>
      <Button
        size="large"
        color="primary"
        startIcon={<CasinoIcon sx={{ fontSize: "30px !important" }} />}
        disableElevation
        fullWidth
        disabled={luckyPicking}
        variant="contained"
        onClick={() => luckyPick(Number(id))}
        sx={{ borderRadius: 5, mb: 2, height: 56, fontSize: "20px" }}
      >
        {luckyPicking ? (
          <FormattedMessage id="lucky.picking" />
        ) : (
          <FormattedMessage id="lucky.pick" />
        )}
      </Button>

      <Dialog
        fullWidth
        TransitionComponent={Zoom}
        onClose={closeModal}
        open={modalVisible}
        maxWidth="xs"
        PaperProps={{
          sx: { borderRadius: 5 },
        }}
      >
        <DialogTitle color="secondary" sx={{ textAlign: "center" }}>
          <FormattedMessage id="lucky.picked.result" />
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            src={luckyPickedItem?.image_url}
            sx={{ width: 168, height: 168 }}
          >
            <CategoryIcon sx={{ fontSize: 60 }} />
          </Avatar>
          <Typography color={brown[700]} mt={2} variant="h6">
            {luckyPickedItem?.name}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            fullWidth
            size="large"
            disableElevation
            variant="contained"
            onClick={closeModal}
            sx={{ borderRadius: 5, m: 1 }}
          >
            <FormattedMessage id="action.close" />
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
});
