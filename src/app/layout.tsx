import "./globals.css";

import { ReactNode } from "react";
import Header from "@/src/components/Header";
import StytchProvider from "@/src/components/StytchProvider";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
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
  );
}
