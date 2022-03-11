import {
  Box,
  Button,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { amber } from "@mui/material/colors";
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
  const [userRole, setUserRole] = React.useState<UserRole>(
    userDraw?.role ?? "participant"
  );

  const isEditing = useUserDrawsStore((state) => state.isEditing);
  const isChangeRoleForbidden = useChangeRoleForbiddenCheck(userDraw);

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
    <Drawer anchor="bottom" open={visible} onClose={onClose}>
      <form onSubmit={onSubmit}>
        <Box p={2} display="flex" flexDirection="column" alignItems="center">
          <Typography
            sx={{ mb: 2, textAlign: "center", color: amber[900] }}
            variant="h6"
            fontWeight="bold"
          >
            <FormattedMessage id="draw.users.role.edit" />
          </Typography>

          <FormControl fullWidth>
            <InputLabel>
              <FormattedMessage id="draw.users.role" />
            </InputLabel>
            <Select
              disabled={isEditing || isChangeRoleForbidden}
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

          <Button
            fullWidth
            type="submit"
            size="large"
            disableElevation
            variant="contained"
            sx={{ mt: 2, color: "white", borderRadius: 5 }}
            color="secondary"
            disabled={isEditing || isChangeRoleForbidden}
          >
            <FormattedMessage id="action.edit" />
          </Button>
        </Box>
      </form>
    </Drawer>
  );
});
