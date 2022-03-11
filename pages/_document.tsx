import { Head, Html, Main, NextScript } from "next/document";
import React from "react";

const Document = () => {
  return (
    <Html>
      <Head>
        {[192, 256, 384, 512].map((size) => (
          <link
            key={size}
            rel="apple-touch-icon"
            sizes={`${size}x${size}`}
            href={`/icon-${size}x${size}.png`}
          />
        ))}

        <link rel="icon" type="image/png" href={`/icon-192x192.png`} />

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />

        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffb300" />
        <NextScript />
      </Head>
      <Main />
    </Html>
  );
};

export default Document;
