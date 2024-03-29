import "./globals.css";

import Header from "@/src/components/Header";
import StytchProvider from "@/src/components/StytchProvider";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <StytchProvider>
      <html lang="en">
        <title>Stytch Next.js App Router Example</title>
        <meta
          name="description"
          content="An example Next.js App Router application using Stytch for authentication"
        />
        <body>
          <Header />
          <main>
            <div className="container">{children}</div>
          </main>
        </body>
      </html>
    </StytchProvider>
  );
}
