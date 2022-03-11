import React from "react";
import {
  Autocomplete,
  Avatar,
  Box,
  Drawer,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from "@mui/material";
import { User } from "types/User";
import { userAPI } from "api/user";
import { FormTitle } from "components/FormTitle";
import { FormattedMessage, useIntl } from "react-intl";
import { useAuthStore } from "hooks/useAuthStore";
import { useUserDraws } from "hooks/userDraws/useUserDraws";
import { useRouter } from "next/router";
import { FormSubmitButton } from "components/FormSubmitButton";
import { useUserDrawsStore } from "hooks/useUserDrawsStore";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export const AddUserModal = React.memo<Props>(({ visible, onClose }) => {
  const { formatMessage } = useIntl();
  const {
    query: { id },
  } = useRouter();

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [searchUserKeyword, setSearchUserKeyword] = React.useState("");
  const [searchedUsers, setSearchedUsers] = React.useState<User[]>([]);
  const currentUser = useAuthStore((state) => state.currentUser);
  const [userId, setUserId] = React.useState<number | null>(null);
  const userDraws = useUserDraws(Number(id));
  const isEditing = useUserDrawsStore((state) => state.isEditing);
  const createUserDraw = useUserDrawsStore((state) => state.createUserDraw);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!userId) {
      return;
    }

    await createUserDraw({ user_id: userId, draw_id: Number(id) });
    onClose();
  };

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const users = await userAPI.searchUsers(searchUserKeyword);
      setSearchedUsers(users);
      setLoading(false);
    })();
  }, [searchUserKeyword]);

  React.useEffect(() => {
    if (visible) {
      setUserId(null);
    }
  }, [visible]);

  return (
    <Drawer anchor="bottom" open={visible} onClose={onClose}>
      <form onSubmit={onSubmit}>
        <Box p={2} display="flex" flexDirection="column" alignItems="center">
          <FormTitle>
            <FormattedMessage id="draw.users.add" />
          </FormTitle>

          <Autocomplete
            fullWidth
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            onChange={(_, value) => setUserId(value?.id || null)}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option: User) => option.email}
            renderOption={(props, option) => {
              return (
                <ListItem {...props}>
                  <ListItemAvatar>
                    <Avatar src={option.photo_url} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={option.display_name}
                    secondary={option.email}
                  />
                </ListItem>
              );
            }}
            options={searchedUsers.filter(
              (user) =>
                user.id !== currentUser?.id &&
                !userDraws.find((ud) => ud.user.id === user.id)
            )}
            loadingText={formatMessage({ id: "searching" })}
            loading={loading}
            onInputChange={(_, newInputValue) => {
              setSearchUserKeyword(newInputValue);
            }}
            noOptionsText={formatMessage({ id: "no.options" })}
            renderInput={(params) => (
              <TextField
                {...params}
                label={formatMessage({ id: "draw.users.search" })}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
          <FormSubmitButton disabled={isEditing || !userId}>
            <FormattedMessage id="action.create" />
          </FormSubmitButton>
        </Box>
      </form>
    </Drawer>
  );
});
