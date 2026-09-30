"use client";

import React from "react";
import { Products, StytchLogin } from "@stytch/nextjs";
import { getDomainFromWindow } from '../../lib/urlUtils';

/*
 * Login configures and renders the StytchLogin component which is a prebuilt UI component for auth powered by Stytch.
 * 
 * This component accepts style, config, and callbacks props. To learn more about possible options review the documentation at
 * https://stytch.com/docs/sdks/javascript-sdk#ui-configs.
*/
const Login = () => {
  const styles = {
    container: {
      width: "100%",
    },
    buttons: {
      primary: {
        backgroundColor: "#4A37BE",
        borderColor: "#4A37BE",
      },
    },
  };

  const config = {
    products: [Products.emailMagicLinks],
    emailMagicLinksOptions: {
      loginRedirectURL: getDomainFromWindow() + '/authenticate',
      loginExpirationMinutes: 60,
      signupRedirectURL: getDomainFromWindow() + '/authenticate',
      signupExpirationMinutes: 60,
    },
  } as React.ComponentProps<typeof StytchLogin>["config"];

  return <StytchLogin config={config} styles={styles} />;
};

export default Login;
