import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Drawer,
  Zoom,
} from "@mui/material";
import { orange } from "@mui/material/colors";
import { useAuthStore } from "hooks/useAuthStore";
import React from "react";
import { FormattedMessage } from "react-intl";

export const UserAvatar = React.memo(() => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const currentUser = useAuthStore((state) => state.currentUser);
  const logout = useAuthStore((state) => state.logout);

  const onDrawerOpen = () => setDrawerOpen(true);
  const onDrawerClose = () => setDrawerOpen(false);

  const onLogout = () => {
    onDrawerClose();
    logout();
  };

  if (currentUser === null) {
    return null;
  }

  return (
    <React.Fragment>
      <Zoom in>
        <Avatar
          src={currentUser.photo_url}
          sx={{ bgcolor: orange[700] }}
          onClick={onDrawerOpen}
        />
      </Zoom>

      <Drawer anchor="bottom" open={drawerOpen} onClose={onDrawerClose}>
        <List sx={{ mx: 1 }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar src={currentUser.photo_url} onClick={onDrawerOpen} />
            </ListItemAvatar>
            <ListItemText
              primary={currentUser.display_name}
              secondary={currentUser.email}
            />
          </ListItem>
        </List>
        <Button
          disableElevation
          variant="contained"
          size="large"
          sx={{ mx: 2, mb: 2, color: "white", borderRadius: 5 }}
          color="secondary"
          onClick={onLogout}
        >
          <FormattedMessage id="app.logout" />
        </Button>
      </Drawer>
    </React.Fragment>
  );
});
