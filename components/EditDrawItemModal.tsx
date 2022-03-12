import React, { FormEventHandler } from "react";
import { Box, TextField } from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import { useDrawsStore } from "hooks/useDrawsStore";
import { AvatarUploader } from "components/AvatarUploader";
import CasinoIcon from "@mui/icons-material/Casino";
import { FormTitle } from "./FormTitle";
import { FormSubmitButton } from "./FormSubmitButton";
import { DrawItem } from "types/DrawItem";
import { useDrawItemsStore } from "hooks/useDrawItemsStore";
import { useRouter } from "next/router";
import { BottomDrawer } from "./BottomDrawer";

interface Props {
  drawItem?: DrawItem;
  visible: boolean;
  onClose: () => void;
}

export const EditDrawItemModal = React.memo<Props>(
  ({ visible, onClose, drawItem }) => {
    const {
      query: { id },
    } = useRouter();

    const { formatMessage } = useIntl();
    const [name, setName] = React.useState("");
    const [imageUrl, setImageUrl] = React.useState("");
    const createDrawItem = useDrawItemsStore((state) => state.createDrawItem);
    const editDrawItem = useDrawItemsStore((state) => state.editDrawItem);
    const isEditing = useDrawsStore((state) => state.isEditing);
    const isEditMode = Boolean(drawItem);

    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
      e.preventDefault();
      if (isEditMode) {
        await editDrawItem({
          id: drawItem?.id,
          name,
          image_url: imageUrl ?? null,
        });
      } else if (id) {
        await createDrawItem(Number(id), { name, image_url: imageUrl });
      }
      onClose();
    };

    React.useEffect(() => {
      if (visible) {
        setName(drawItem?.name || "");
        setImageUrl(drawItem?.image_url || "");
      } else {
        setName("");
        setImageUrl("");
      }
    }, [drawItem, visible]);

    return (
      <BottomDrawer open={visible} onClose={onClose}>
        <form onSubmit={onSubmit}>
          <Box p={2} display="flex" flexDirection="column" alignItems="center">
            <FormTitle>
              <FormattedMessage
                id={`drawItem.${isEditMode ? "edit" : "create"}.title`}
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
              label={formatMessage({ id: "drawItem.name" })}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <FormSubmitButton disabled={isEditing || !name}>
              <FormattedMessage
                id={`action.${isEditMode ? "edit" : "create"}`}
              />
            </FormSubmitButton>
          </Box>
        </form>
      </BottomDrawer>
    );
  }
);
