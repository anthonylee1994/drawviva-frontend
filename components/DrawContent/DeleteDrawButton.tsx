import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { FormattedMessage } from "react-intl";
import {
  Delete as DeleteIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useDrawsStore } from "hooks/useDrawsStore";
import { useRouter } from "next/router";
import { useAdminCheck } from "hooks/useAdminCheck";
import { useUserDrawsStore } from "hooks/useUserDrawsStore";
import { useUserDraws } from "hooks/userDraws/useUserDraws";
import { useAuthStore } from "hooks/useAuthStore";

export const DeleteDrawButton = React.memo(() => {
  const {
    query: { id },
    push,
  } = useRouter();
  const [confirmDialogVisible, setConfirmDialogVisible] = React.useState(false);

  const isAdmin = useAdminCheck();
  const currentUser = useAuthStore((state) => state.currentUser);
  const deleteDraw = useDrawsStore((state) => state.deleteDraw);
  const isDeleting = useDrawsStore((state) => state.isDeleting);
  const deleteUserDraw = useUserDrawsStore((state) => state.deleteUserDraw);
  const isUserDrawDeleting = useUserDrawsStore((state) => state.isEditing);

  const userDraws = useUserDraws(Number(id));

  const currentUserDraw = userDraws.find(
    (userDraw) => userDraw.user.id === currentUser?.id
  );

  const onConfirmDialogOpen = React.useCallback(() => {
    setConfirmDialogVisible(true);
  }, []);

  const onConfirmDialogClose = React.useCallback(() => {
    setConfirmDialogVisible(false);
  }, []);

  const onDelete = async () => {
    if (isAdmin) {
      await deleteDraw(Number(id));
      setConfirmDialogVisible(false);
      push("/");
    } else if (currentUserDraw) {
      await deleteUserDraw(currentUserDraw.id);
      setConfirmDialogVisible(false);
      push("/");
    }
  };

  return (
    <React.Fragment>
      <Button
        size="large"
        color="error"
        startIcon={isAdmin ? <DeleteIcon /> : <LogoutIcon />}
        disableElevation
        fullWidth
        variant="contained"
        onClick={onConfirmDialogOpen}
        sx={(theme) => ({
          borderRadius: 5,
          mb: 2,
          fontSize: 18,
          [theme.breakpoints.down("sm")]: {
            fontSize: 16,
          },
        })}
      >
        {isAdmin ? (
          <FormattedMessage id="draw.delete" />
        ) : (
          <FormattedMessage id="draw.leave" />
        )}
      </Button>

      <Dialog onClose={onConfirmDialogClose} open={confirmDialogVisible}>
        <DialogTitle>
          {isAdmin ? (
            <FormattedMessage id="action.delete.confirm.title" />
          ) : (
            <FormattedMessage id="action.leave.confirm.title" />
          )}
        </DialogTitle>
        <DialogContent>
          {isAdmin ? (
            <FormattedMessage id="draw.delete.confirm.message" />
          ) : (
            <FormattedMessage id="draw.leave.confirm.message" />
          )}
        </DialogContent>
        <DialogActions>
          <Button
            disabled={isDeleting || isUserDrawDeleting}
            onClick={onConfirmDialogClose}
          >
            <FormattedMessage id="action.cancel" />
          </Button>
          <Button
            disabled={isDeleting || isUserDrawDeleting}
            onClick={onDelete}
          >
            {isAdmin ? (
              <FormattedMessage id="action.delete" />
            ) : (
              <FormattedMessage id="action.leave" />
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
});
