import { Head, Html, Main, NextScript } from "next/document";
import React from "react";

const Document = () => {
  return (
    <Html>
      <Head>
        <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
        {[192, 256, 384, 512].map((size) => (
          <link
            key={size}
            rel="apple-touch-icon"
            sizes={`${size}x${size}`}
            href={`/icon-${size}x${size}.png`}
          />
        ))}

        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <NextScript />
      </Head>
      <Main />
    </Html>
  );
};

export default Document;
