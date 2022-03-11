import { Button, Container, Fade, Icon, Typography } from "@mui/material";
import { brown, red } from "@mui/material/colors";
import React from "react";
import { GiClown } from "react-icons/gi";
import { FormattedMessage } from "react-intl";
import SendIcon from "@mui/icons-material/Send";
import { useAuthStore } from "hooks/useAuthStore";
import { CircularProgress } from "@mui/material";

export const LoginPage = React.memo(() => {
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);

  React.useEffect(() => {
    document.body.style.backgroundColor = "#ffb300";
    return () => {
      document.body.style.backgroundColor = "transparent";
    };
  }, []);

  return (
    <Fade in>
      <Container
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          p: theme.spacing(2),
        })}
      >
        <Icon
          sx={(theme) => ({
            mb: 2,
            color: red[700],
            fontSize: "260px !important",
            transition: "0.3s ease-in-out",
            [theme.breakpoints.down("sm")]: {
              fontSize: "200px !important",
            },
          })}
        >
          <GiClown />
        </Icon>
        <Typography
          sx={(theme) => ({
            color: brown[600],
            fontSize: theme.typography.h2.fontSize,
            transition: "0.3s ease-in-out",
            [theme.breakpoints.down("sm")]: {
              fontSize: theme.typography.h3.fontSize,
            },
          })}
          fontWeight="bold"
          variant="h2"
        >
          <FormattedMessage id="app.title" />
        </Typography>
        <Typography
          variant="h4"
          sx={(theme) => ({
            color: brown[600],
            fontSize: theme.typography.h3.fontSize,
            transition: "0.3s ease-in-out",
            mb: 8,
            [theme.breakpoints.down("sm")]: {
              fontSize: theme.typography.h4.fontSize,
              mb: 4,
            },
          })}
        >
          <FormattedMessage id="app.caption" />
        </Typography>

        {isLoading ? (
          <CircularProgress size={48} sx={{ color: red[900] }} thickness={5} />
        ) : (
          <Button
            size="large"
            variant="contained"
            endIcon={<SendIcon />}
            onClick={login}
            sx={(theme) => ({
              transition: "0.3s ease-in-out",
              bgcolor: `${red[900]} !important`,
              borderRadius: 40,
              color: "white",
              fontSize: theme.typography.h6.fontSize,
              [theme.breakpoints.down("sm")]: {
                fontSize: theme.typography.body1.fontSize,
              },
            })}
          >
            <FormattedMessage id="app.google.login" />
          </Button>
        )}
      </Container>
    </Fade>
  );
});
