import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { FormattedMessage } from "react-intl";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useDrawsStore } from "hooks/useDrawsStore";
import { useRouter } from "next/router";

export const DeleteDrawButton = React.memo(() => {
  const {
    query: { id },
    push,
  } = useRouter();
  const [confirmDialogVisible, setConfirmDialogVisible] = React.useState(false);

  const draw = useDrawsStore((state) =>
    state.draws.find((draw) => draw.id === Number(id))
  );
  const deleteDraw = useDrawsStore((state) => state.deleteDraw);
  const isDeleting = useDrawsStore((state) => state.isDeleting);

  const onConfirmDialogOpen = React.useCallback(() => {
    setConfirmDialogVisible(true);
  }, []);

  const onConfirmDialogClose = React.useCallback(() => {
    setConfirmDialogVisible(false);
  }, []);

  const onDelete = React.useCallback(async () => {
    await deleteDraw(Number(id));
    setConfirmDialogVisible(false);
    push("/");
  }, [deleteDraw, id, push]);

  if (draw?.user_draw.role !== "admin") {
    return null;
  }

  return (
    <React.Fragment>
      <Button
        color="error"
        startIcon={<DeleteIcon />}
        disableElevation
        fullWidth
        variant="contained"
        onClick={onConfirmDialogOpen}
        sx={{ borderRadius: 5 }}
      >
        <FormattedMessage id="draw.delete" />
      </Button>

      <Dialog onClose={onConfirmDialogClose} open={confirmDialogVisible}>
        <DialogTitle>
          <FormattedMessage id="action.delete.confirm.title" />
        </DialogTitle>
        <DialogContent>
          <FormattedMessage id="draw.delete.confirm.message" />
        </DialogContent>
        <DialogActions>
          <Button disabled={isDeleting} onClick={onConfirmDialogClose}>
            <FormattedMessage id="action.cancel" />
          </Button>
          <Button disabled={isDeleting} onClick={onDelete}>
            <FormattedMessage id="action.delete" />
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
});