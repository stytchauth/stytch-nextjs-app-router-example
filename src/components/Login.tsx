"use client";

import React from "react";
import { StytchLogin } from "@stytch/nextjs";
import { Products } from "@stytch/vanilla-js";
import { getDomainFromWindow } from '../../lib/urlUtils';

/*
 * Login configures and renders the StytchLogin component which is a prebuilt UI component for auth powered by Stytch
 * 
 * This component accepts style, config, and callbacks props. To learn more about possible options review the documentation at
 * https://stytch.com/docs/sdks/javascript-sdk#ui-configs
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
    products: [Products.emailMagicLinks, Products.oauth, Products.otp],
    emailMagicLinksOptions: {
      loginRedirectURL: getDomainFromWindow() + '/authenticate',
      loginExpirationMinutes: 60,
      signupRedirectURL: getDomainFromWindow() + '/authenticate',
      signupExpirationMinutes: 60,
    },
    oauthOptions: {
      providers: [{ type: "google" }],
      loginRedirectURL: getDomainFromWindow() + '/authenticate',
      signupRedirectURL: getDomainFromWindow() + '/authenticate',
    },
    otpOptions: {
      methods: ["sms"],
      expirationMinutes: 10,
    },
  } as Parameters<typeof StytchLogin>[0]["config"];

  return <StytchLogin config={config} styles={styles} />;
};

export default Login;
