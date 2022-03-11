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
import { useAdminCheck } from "hooks/useAdminCheck";

export const UserChipList = React.memo(() => {
  const {
    query: { id },
  } = useRouter();
  const [focusItem, setFocusItem] = React.useState<UserDraw | undefined>(
    undefined
  );

  const isAdmin = useAdminCheck();
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
          onEdit={() => {
            setFocusItem(userDraw);
            setEditModalVisible(true);
          }}
        />
      ))}

      {isAdmin && <AddChipButton />}

      <DeleteConfirmModal
        visible={isDeleteConfirmModalVisible}
        onConfirm={() => {
          focusItem && deleteUserDraw(focusItem.id);
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
