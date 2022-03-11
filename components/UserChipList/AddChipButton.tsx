import React from "react";
import { Chip } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useIntl } from "react-intl";
import { AddUserModal } from "./AddUserModal";

export const AddChipButton = React.memo(() => {
  const { formatMessage } = useIntl();
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <React.Fragment>
      <Chip
        sx={{ m: 0.5 }}
        clickable
        onClick={() => setModalVisible(true)}
        avatar={<AddIcon />}
        label={formatMessage({ id: "draw.users.add" })}
      />

      <AddUserModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </React.Fragment>
  );
});
