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
        clickable
        sx={(theme) => ({
          m: 0.5,
          fontSize: 16,
          height: 40,
          borderRadius: 5,
          [theme.breakpoints.down("sm")]: {
            height: 32,
            fontSize: 14,
          },
        })}
        avatar={<AddIcon />}
        onClick={() => setModalVisible(true)}
        label={formatMessage({ id: "draw.users.add" })}
      />

      <AddUserModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </React.Fragment>
  );
});
