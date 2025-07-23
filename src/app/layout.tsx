import "./globals.css";
import { ReactNode } from "react";
import Header from "@/src/components/Header";
import StytchProvider from "@/src/components/StytchProvider";

export const metadata = {
  title: "Stytch Next.js App Router Example",
  description: "An example Next.js App Router application using Stytch for authentication",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <StytchProvider>
      <html lang="en">
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
