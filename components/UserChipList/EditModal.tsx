import {
  Avatar,
  Box,
  Drawer,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { BottomDrawer } from "components/BottomDrawer";
import { FormSubmitButton } from "components/FormSubmitButton";
import { FormTitle } from "components/FormTitle";
import { useAdminCheck } from "hooks/useAdminCheck";
import { useDrawsStore } from "hooks/useDrawsStore";
import { useChangeRoleForbiddenCheck } from "hooks/userDraws/useChangeRoleForbiddenCheck";
import { useUserDrawsStore } from "hooks/useUserDrawsStore";
import { useRouter } from "next/router";
import React from "react";
import { FormattedMessage } from "react-intl";
import { UserDraw } from "types/UserDraw";
import { UserRole } from "types/UserRole";

interface Props {
  userDraw?: UserDraw;
  visible: boolean;
  onClose: () => void;
}

export const EditModal = React.memo<Props>(({ userDraw, visible, onClose }) => {
  const {
    query: { id },
  } = useRouter();

  const [userRole, setUserRole] = React.useState<UserRole>(
    userDraw?.role ?? "participant"
  );

  const isEditing = useUserDrawsStore((state) => state.isEditing);
  const isChangeRoleForbidden = useChangeRoleForbiddenCheck(userDraw);
  const isAdmin = useAdminCheck();
  const isFormDisabled = isEditing || isChangeRoleForbidden || !isAdmin;

  const editUserDraw = useUserDrawsStore((state) => state.editUserDraw);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editUserDraw({
      draw_id: userDraw?.draw_id,
      id: userDraw?.id,
      role: userRole,
    });
    onClose();
  };

  React.useEffect(() => {
    if (userDraw) {
      setUserRole(userDraw.role);
    }
  }, [userDraw]);

  return (
    <BottomDrawer open={visible} onClose={onClose}>
      <form onSubmit={onSubmit}>
        <Box p={2} display="flex" flexDirection="column" alignItems="center">
          <FormTitle>
            <FormattedMessage id="draw.users.role.edit" />
          </FormTitle>

          <List sx={{ mt: -3, width: "100%", mb: 1 }}>
            <ListItem sx={{ px: 1 }}>
              <ListItemAvatar>
                <Avatar src={userDraw?.user.photo_url} />
              </ListItemAvatar>
              <ListItemText
                primary={userDraw?.user.display_name}
                secondary={userDraw?.user.email}
              />
            </ListItem>
          </List>

          <FormControl fullWidth>
            <InputLabel>
              <FormattedMessage id="draw.users.role" />
            </InputLabel>
            <Select
              disabled={isFormDisabled}
              value={userRole}
              label="draw.users.role"
              onChange={({ target: { value } }) =>
                setUserRole(value as UserRole)
              }
            >
              <MenuItem value="participant">
                <FormattedMessage id="draw.users.role.participant" />
              </MenuItem>
              <MenuItem value="admin">
                <FormattedMessage id="draw.users.role.admin" />
              </MenuItem>
            </Select>
          </FormControl>

          {isChangeRoleForbidden && (
            <Typography mt={1} variant="body2" color="error">
              <FormattedMessage id="draw.users.only.admin.warning" />
            </Typography>
          )}

          {!isAdmin && (
            <Typography mt={1} variant="body2" color="error">
              <FormattedMessage id="draw.users.not.admin.warning" />
            </Typography>
          )}

          <FormSubmitButton disabled={isFormDisabled}>
            <FormattedMessage id="action.edit" />
          </FormSubmitButton>
        </Box>
      </form>
    </BottomDrawer>
  );
});
