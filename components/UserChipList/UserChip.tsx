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
      sx={{ m: 0.5 }}
      label={userDraw.user.display_name}
      avatar={<Avatar src={userDraw.user.photo_url} />}
    />
  );
});
