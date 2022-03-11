import React, { FormEventHandler } from "react";
import { Box, Button, Drawer, TextField, Typography } from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import { amber } from "@mui/material/colors";
import { useDrawsStore } from "hooks/useDrawsStore";
import { AvatarUploader } from "components/AvatarUploader";
import CasinoIcon from "@mui/icons-material/Casino";
import { Draw } from "types/Draw";

interface Props {
  draw?: Draw;
  visible: boolean;
  onClose: () => void;
}

export const EditDrawModal = React.memo<Props>(({ visible, onClose, draw }) => {
  const { formatMessage } = useIntl();
  const [name, setName] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const createDraw = useDrawsStore((state) => state.createDraw);
  const editDraw = useDrawsStore((state) => state.editDraw);
  const isEditing = useDrawsStore((state) => state.isEditing);
  const isEditMode = Boolean(draw);

  const onSubmit: FormEventHandler<HTMLFormElement> = React.useCallback(
    async (e) => {
      e.preventDefault();
      if (isEditMode) {
        await editDraw({ id: draw?.id, name, image_url: imageUrl ?? null });
      } else {
        await createDraw({ name, image_url: imageUrl });
      }
      onClose();
    },
    [createDraw, draw?.id, editDraw, imageUrl, isEditMode, name, onClose]
  );

  React.useEffect(() => {
    if (draw) {
      setName(draw.name);
      setImageUrl(draw.image_url);
    } else {
      setName("");
      setImageUrl("");
    }
  }, [draw]);

  return (
    <Drawer anchor="bottom" open={visible} onClose={onClose}>
      <form onSubmit={onSubmit}>
        <Box p={2} display="flex" flexDirection="column" alignItems="center">
          <Typography
            sx={{ mb: 2, textAlign: "center", color: amber[900] }}
            variant="h6"
            fontWeight="bold"
          >
            <FormattedMessage
              id={`draw.${isEditMode ? "edit" : "create"}.title`}
            />
          </Typography>

          <AvatarUploader
            setImageUrl={setImageUrl}
            imageUrl={imageUrl}
            icon={<CasinoIcon sx={{ fontSize: 48 }} />}
          />

          <TextField
            sx={{ mt: 3 }}
            autoFocus
            fullWidth
            variant="filled"
            color="secondary"
            label={formatMessage({ id: "draw.name" })}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Button
            fullWidth
            type="submit"
            size="large"
            disableElevation
            variant="contained"
            sx={{ mt: 2, color: "white", borderRadius: 5 }}
            color="secondary"
            disabled={isEditing || !name}
          >
            <FormattedMessage id={`action.${isEditMode ? "edit" : "create"}`} />
          </Button>
        </Box>
      </form>
    </Drawer>
  );
});
