import React, { FormEventHandler } from "react";
import { Box, Button, Drawer, TextField } from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import { useDrawsStore } from "hooks/useDrawsStore";
import { AvatarUploader } from "components/AvatarUploader";
import CasinoIcon from "@mui/icons-material/Casino";
import { Draw } from "types/Draw";
import { FormTitle } from "./FormTitle";
import { FormSubmitButton } from "./FormSubmitButton";

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
          <FormTitle>
            <FormattedMessage
              id={`draw.${isEditMode ? "edit" : "create"}.title`}
            />
          </FormTitle>

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

          <FormSubmitButton disabled={isEditing || !name}>
            <FormattedMessage id={`action.${isEditMode ? "edit" : "create"}`} />
          </FormSubmitButton>
        </Box>
      </form>
    </Drawer>
  );
});
