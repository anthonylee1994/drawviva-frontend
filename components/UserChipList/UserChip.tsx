import React from "react";
import { Avatar, Chip } from "@mui/material";
import { useAuthStore } from "hooks/useAuthStore";
import { UserDraw } from "types/UserDraw";

interface Props {
  userDraw: UserDraw;
  onDelete?: () => void;
  onEdit?: () => void;
}

export const UserChip = React.memo<Props>(({ userDraw, onDelete, onEdit }) => {
  const currentUser = useAuthStore((state) => state.currentUser);

  return (
    <Chip
      color={userDraw.role === "admin" ? "primary" : undefined}
      clickable={typeof onEdit === "function"}
      onClick={onEdit}
      onDelete={currentUser?.id === userDraw.user.id ? undefined : onDelete}
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
      label={userDraw.user.display_name}
      avatar={
        <Avatar
          sx={(theme) => ({
            width: "32px !important",
            height: "32px !important",
            [theme.breakpoints.down("sm")]: {
              width: "24px !important",
              height: "24px !important",
            },
          })}
          src={userDraw.user.photo_url}
        />
      }
    />
  );
});
