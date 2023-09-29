import "./globals.css";

import { ReactNode } from "react";
import Header from "@/src/components/Header";
import StytchProvider from "@/src/components/StytchProvider";
import Head from "next/head";
import Script from "next/script";
import React from 'react';

declare global {
  let GetTelemetryID: any;
}

export default function RootLayout({ children }: { children: ReactNode }) {
  let telemetryId = null;
  if (GetTelemetryID) {
    telemetryId = GetTelemetryID(process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN);
    console.log("Telemetry ID generated: ", telemetryId);
  }


  return (
    <>
    <Head>
        <title>Stytch Next.js Example</title>
        <meta
          name="description"
          content="An example Next.js application using Stytch for authentication"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Script
        id="dfp-script"
        src="https://elements.stytch.com/telemetry.js"
        type="text/javascript"
        strategy="beforeInteractive"
      />
    <StytchProvider>
      <html lang="en">
        <title>Stytch Next.js 13 Example</title>
        <meta
          name="description"
          content="An example Next.js 13 application using Stytch for authentication"
        />
        <body>
          <Header />
          <main>
            <div className="container">{children}</div>
          </main>
        </body>
      </html>
    </StytchProvider>
    </>
  );
}
