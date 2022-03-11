import React, { ChangeEventHandler } from "react";
import { Avatar, Box, CircularProgress, IconButton } from "@mui/material";
import { Upload as UploadIcon, Close as CloseIcon } from "@mui/icons-material";
import { uploadAPI } from "api/upload";
import { red } from "@mui/material/colors";

interface Props {
  imageUrl: string;
  setImageUrl: (url: string) => void;
  icon: React.ReactElement;
}

export const AvatarUploader = React.memo<Props>(
  ({ icon, setImageUrl, imageUrl }) => {
    const [isLoading, setLoading] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const onClick = React.useCallback(() => {
      if (imageUrl) {
        setImageUrl("");
      } else {
        inputRef.current?.click();
      }
    }, [imageUrl, setImageUrl]);

    const onChange: ChangeEventHandler<HTMLInputElement> = React.useCallback(
      async (e) => {
        setLoading(true);
        const file = e.target.files?.[0];

        if (!file) {
          return;
        }

        const url = await uploadAPI.uploadImage(file);
        setImageUrl(url);
        e.target.value = "";
        setLoading(false);
      },
      [setImageUrl]
    );

    return (
      <Box position="relative">
        <Box
          position="relative"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar
            src={imageUrl}
            sx={(theme) => ({
              width: 168,
              height: 168,
              border: `solid 1px ${theme.palette.grey[300]}`,
              opacity: isLoading ? 0.5 : 1,
            })}
          >
            {icon}
          </Avatar>
          {isLoading && (
            <CircularProgress
              thickness={5}
              color="secondary"
              sx={{ position: "absolute", zIndex: 1 }}
            />
          )}
        </Box>
        <input
          style={{ display: "none" }}
          accept="image/*"
          type="file"
          ref={inputRef}
          onChange={onChange}
        />
        {!isLoading && (
          <IconButton
            onClick={onClick}
            sx={(theme) => ({
              position: "absolute",
              bottom: theme.spacing(1),
              right: 0,
              padding: imageUrl ? 0.5 : 1,
              bgcolor: `${
                imageUrl ? red[400] : theme.palette.secondary.main
              } !important`,
              color: "white",
            })}
          >
            {imageUrl ? <CloseIcon /> : <UploadIcon />}
          </IconButton>
        )}
      </Box>
    );
  }
);
