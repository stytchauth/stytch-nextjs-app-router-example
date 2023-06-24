'use client'

import './globals.css'
import { StytchProvider } from "@stytch/nextjs";
import { createStytchUIClient } from "@stytch/nextjs/ui";
import Header from 'src/components/Header'

// We initialize the Stytch client using our project's public token which can be found in the Stytch dashboard
const stytch = createStytchUIClient(
  process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN
);

export default function RootLayout({ children }) {
  return (
    <StytchProvider stytch={stytch}>
      <html lang="en">
        <body>
          <Header />
          <main>
            <div className="container">
              {children}
            </div>
          </main>
        </body>
      </html>
    </StytchProvider>
  )
}
