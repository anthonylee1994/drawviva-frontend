import React from "react";
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
import { useRouter } from "next/router";
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
                <Avatar
                  sx={(theme) => ({
                    width: theme.spacing(8),
                    height: theme.spacing(8),
                    transition: "0.2s ease-in-out",
                    [theme.breakpoints.down("sm")]: {
                      width: theme.spacing(6),
                      height: theme.spacing(6),
                    },
                  })}
                  src={drawItem.image_url}
                >
                  <ItemIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                sx={(theme) => ({
                  ml: 2,
                  [theme.breakpoints.down("sm")]: {
                    ml: 0,
                  },
                })}
                primaryTypographyProps={{
                  sx: (theme) => ({
                    fontSize: 18,
                    [theme.breakpoints.down("sm")]: {
                      fontSize: 16,
                    },
                  }),
                }}
                primary={drawItem.name}
              />
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
