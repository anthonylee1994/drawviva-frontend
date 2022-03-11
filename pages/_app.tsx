import React from "react";
import "styles/globals.css";
import type { AppProps } from "next/app";
import { useInitializePushNotification } from "hooks/useInitializePushNotification";
import { ThemeProvider } from "@mui/material";
import { theme } from "utils/theme";
import { IntlProvider } from "react-intl";
import zhHK from "locales/zh-HK";
import Head from "next/head";
import { useAuthStore } from "hooks/useAuthStore";
import { useRouter } from "next/router";

const App = React.memo<AppProps>(({ Component, pageProps }) => {
  const router = useRouter();
  const verifyAuth = useAuthStore((state) => state.verifyAuth);

  useInitializePushNotification();

  React.useEffect(() => {
    if (!localStorage.getItem("token") && router.pathname !== "/") {
      router.push("/");
    }
    verifyAuth();
  }, [router, verifyAuth]);

  return (
    <React.Fragment>
      <Head>
        <title>秒抽DrawViva: 簡易抽籤 Web App</title>
      </Head>
      <IntlProvider locale="zh-HK" messages={zhHK}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </IntlProvider>
    </React.Fragment>
  );
});

export default App;
