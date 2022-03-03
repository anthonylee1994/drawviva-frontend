import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";

const App = React.memo<AppProps>(({ Component, pageProps }) => {
  return <Component {...pageProps} />;
});

export default App;
