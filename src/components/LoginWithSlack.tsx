"use client";

import React from "react";

const LoginWithSlack = () => {

  return (
    <div className="card">
      <h1>Login or signup</h1>
        <button className="primary"  onClick={() => window.location.href="https://test.stytch.com/v1/public/oauth/slack/start?public_token=public-token-test-d9b9278d-426f-4f75-8ff4-ca09bc284df0&provider_team=T02EGRUMRM1"}>
        Log in with Slack
        </button>
    </div>
  );
};

export default LoginWithSlack;
