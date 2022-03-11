import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import { AddChipButton } from "./AddChipButton";
import { UserChip } from "./UserChip";
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import { useUserDrawsStore } from "hooks/useUserDrawsStore";
import { EditModal } from "./EditModal";
import { UserDraw } from "types/UserDraw";
import { useUserDraws } from "hooks/userDraws/useUserDraws";
import { useDrawsStore } from "hooks/useDrawsStore";

export const UserChipList = React.memo(() => {
  const {
    query: { id },
  } = useRouter();
  const [focusItem, setFocusItem] = React.useState<UserDraw | undefined>(
    undefined
  );

  const draw = useDrawsStore((state) => state.findDrawById(Number(id)));
  const isAdmin = draw?.user_draw.role === "admin";
  const userDraws = useUserDraws(Number(id));

  const [isDeleteConfirmModalVisible, setDeleteConfirmModalVisible] =
    React.useState(false);
  const [isEditModalVisible, setEditModalVisible] = React.useState(false);

  const deleteUserDraw = useUserDrawsStore((state) => state.deleteUserDraw);
  const isEditing = useUserDrawsStore((state) => state.isEditing);

  if (!userDraws.length) {
    return null;
  }

  return (
    <Box p={2} pb={0}>
      <Typography fontWeight="bold" gutterBottom>
        <FormattedMessage id="draw.users" />
      </Typography>
      {userDraws.map((userDraw, key) => (
        <UserChip
          userDraw={userDraw}
          key={key}
          onDelete={
            isAdmin
              ? () => {
                  setFocusItem(userDraw);
                  setDeleteConfirmModalVisible(true);
                }
              : undefined
          }
          onEdit={
            isAdmin
              ? () => {
                  setFocusItem(userDraw);
                  setEditModalVisible(true);
                }
              : undefined
          }
        />
      ))}

      {isAdmin && <AddChipButton />}

      <DeleteConfirmModal
        visible={isDeleteConfirmModalVisible}
        onConfirm={() => {
          focusItem && deleteUserDraw(Number(id), focusItem.id);
          setDeleteConfirmModalVisible(false);
        }}
        onClose={() => setDeleteConfirmModalVisible(false)}
        isDeleting={isEditing}
      />

      <EditModal
        userDraw={focusItem}
        visible={isEditModalVisible}
        onClose={() => setEditModalVisible(false)}
      />
    </Box>
  );
});
