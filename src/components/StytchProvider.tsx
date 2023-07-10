"use client";
import { StytchProvider as ProviderActual } from "@stytch/nextjs";
import { createStytchUIClient } from "@stytch/nextjs/dist/index.ui";
import { ReactNode } from "react";

// We initialize the Stytch client using our project's public token which can be found in the Stytch dashboard
const stytch = createStytchUIClient(
  process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN || ""
);

const StytchProvider = ({ children }: { children: ReactNode }) => {
  return <ProviderActual stytch={stytch}>{children}</ProviderActual>;
};

export default StytchProvider;
