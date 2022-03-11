import {
  Category as ItemIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
} from "@mui/material";
import { EditDrawItemModal } from "components/EditDrawItemModal";
import { EmptyDrawItems } from "components/EmptyDrawItems";
import { useDrawItems } from "hooks/drawItems/useDrawItems";
import { useAdminCheck } from "hooks/useAdminCheck";
import { useDrawItemsStore } from "hooks/useDrawItemsStore";
import { useDrawsStore } from "hooks/useDrawsStore";
import { useRouter } from "next/router";
import React from "react";
import { DrawItem } from "types/DrawItem";
import { DeleteConfirmModal } from "./DeleteConfirmModal";

export const DrawItemList = React.memo(() => {
  const {
    query: { id },
  } = useRouter();
  const isAdmin = useAdminCheck();

  const drawItems = useDrawItems(Number(id));
  const isEditing = useDrawItemsStore((state) => state.isEditing);
  const deleteDrawItem = useDrawItemsStore((state) => state.deleteDrawItem);
  const [focusItem, setFocusItem] = React.useState<DrawItem | undefined>(
    undefined
  );
  const [editConfirmModalVisible, setEditModalVisible] = React.useState(false);

  const [deleteConfirmModalVisible, setDeleteConfirmModalVisible] =
    React.useState(false);

  if (drawItems.length === 0) {
    return <EmptyDrawItems />;
  }

  return (
    <React.Fragment>
      <Paper sx={{ mb: 3, borderRadius: 5, overflow: "hidden" }}>
        <List>
          {drawItems.map((drawItem, index) => (
            <ListItem
              key={index}
              secondaryAction={
                isAdmin && (
                  <Box>
                    <IconButton
                      onClick={() => {
                        setFocusItem(drawItem);
                        setEditModalVisible(true);
                      }}
                      aria-label="edit"
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      onClick={() => {
                        setFocusItem(drawItem);
                        setDeleteConfirmModalVisible(true);
                      }}
                      edge="end"
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                )
              }
            >
              <ListItemAvatar>
                <Avatar src={drawItem.image_url}>
                  <ItemIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={drawItem.name} />
            </ListItem>
          ))}
        </List>
      </Paper>

      <DeleteConfirmModal
        isDeleting={isEditing}
        visible={deleteConfirmModalVisible}
        onClose={() => setDeleteConfirmModalVisible(false)}
        onConfirm={async () => {
          if (!focusItem) {
            return;
          }

          await deleteDrawItem(focusItem.id);
          setDeleteConfirmModalVisible(false);
        }}
      />

      <EditDrawItemModal
        drawItem={focusItem}
        visible={editConfirmModalVisible}
        onClose={() => setEditModalVisible(false)}
      />
    </React.Fragment>
  );
});
