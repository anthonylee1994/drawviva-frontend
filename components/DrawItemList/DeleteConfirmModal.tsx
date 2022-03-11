import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { FormattedMessage } from "react-intl";

interface Props {
  isDeleting: boolean;
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmModal = React.memo<Props>(
  ({ isDeleting, visible, onClose, onConfirm }) => {
    return (
      <Dialog onClose={onClose} open={visible}>
        <DialogTitle>
          <FormattedMessage id="action.delete.confirm.title" />
        </DialogTitle>
        <DialogContent>
          <FormattedMessage id="drawItem.delete.confirm.message" />
        </DialogContent>
        <DialogActions>
          <Button disabled={isDeleting} onClick={onClose}>
            <FormattedMessage id="action.cancel" />
          </Button>
          <Button disabled={isDeleting} onClick={onConfirm}>
            <FormattedMessage id="action.delete" />
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
);
