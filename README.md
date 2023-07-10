# Stytch Next.js 13 example application

<p align="center">
  <img src="https://user-images.githubusercontent.com/100632220/217049841-b9eeb72a-3e50-4074-839a-e64ee5d4a88c.png" width="750">
</p>

## Overview

This example application demonstrates how one may use Stytch within a Next.js 13 application using the new [App router](https://nextjs.org/docs/app/building-your-application/routing#the-app-router).

In Next.js 13's App router, you may use both [Client](https://nextjs.org/docs/getting-started/react-essentials#client-components) and [Server](https://nextjs.org/docs/getting-started/react-essentials#server-components) components. **This example app primarily uses Client components, however you can see an example of a Server component in `/src/components/Authenticate.js`**. Our [Next.js SDK](https://stytch.com/docs/sdks/javascript-sdk) is compatible with Client components, so anywhere you use it, ensure that you include `'use client'` at the top of the component. If you'd like to use Server components, you may use our [Node Backend SDK](https://www.npmjs.com/package/stytch) to power your authentication flow.

This application features Email Magic Links and Google OAuth authentication. You can use this application's source code as a learning resource, or use it as a jumping off point for your own project. We are excited to see what you build with Stytch!

## Set up

Follow the steps below to get this application fully functional and running using your own Stytch credentials.

### In the Stytch Dashboard

1. Create a [Stytch](https://stytch.com/) account. Once your account is set up a Project called "My first project" will be automatically created for you.

2. Within your new Project, navigate to [SDK configuration](https://stytch.com/dashboard/sdk-configuration), and make the following changes:

   - Click **Enable SDK**.
   - Under **Authorized environments** add the domain `http://localhost:3000`.

     <img width="400" alt="Authorized environments" src="https://user-images.githubusercontent.com/100632220/217052985-2e6fc264-7b8b-452b-9d24-66a76c143d10.png">

3. Navigate to [Redirect URLs](https://stytch.com/dashboard/redirect-urls), and add `http://localhost:3000/authenticate` as the types **Login** and **Sign-up**.

   <img width="400" alt="Redirect URLs" src="https://user-images.githubusercontent.com/100632220/217983021-d8bf6fff-6a68-4e94-bffd-d062e69c8817.png">

4. Navigate to [OAuth](https://stytch.com/dashboard/oauth), and set up login for Google in the Test environment.

   <img width="400" alt="OAuth configuration" src="https://user-images.githubusercontent.com/100632220/217055674-a7dafc17-6ad3-492f-8dd2-92560d60dc00.png">

5. Finally, navigate to [API Keys](https://stytch.com/dashboard/api-keys). You will need the `project_id`, `secret`, and `public_token` values found on this page later on.

### On your machine

In your terminal clone the project and install dependencies:

```bash
git clone https://github.com/cal-stytch/stytch-nextjs13-example.git
cd stytch-nextjs13-example
pnpm i
```

Next, create `.env.local` file by running the command below which copies the contents of `.env.template`.

```bash
cp .env.template .env.local
```

Open `.env.local` in the text editor of your choice, and set the environment variables using the `project_id`, `secret`, and `public_token` found on [API Keys](https://stytch.com/dashboard/api-keys). Leave the `STYTCH_PROJECT_ENV` value as `test`.

```
# This is what a completed .env.local file will look like
STYTCH_PROJECT_ENV=test
STYTCH_PROJECT_ID=project-test-00000000-0000-1234-abcd-abcdef1234
NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN=public-token-test-abcd123-0000-0000-abcd-1234567abc
STYTCH_SECRET=secret-test-12345678901234567890abcdabcd
```

## Running locally

After completing all the set up steps above the application can be run with the command:

```bash
pnpm run dev
```

The application will be available at [`http://localhost:3000`](http://localhost:3000).

You'll be able to login with Email Magic Links or Google OAuth and see your Stytch User object, Stytch Session, and see how logging out works.

## Next steps

This example app showcases a small portion of what you can accomplish with Stytch. Here are a few ideas to explore:

1. Add additional login methods like [Passwords](https://stytch.com/docs/passwords#guides_getting-started-sdk).
2. Replace the prebuilt UI with your own using by using the SDK's [headless methods](https://stytch.com/docs/sdks/javascript-sdk).
3. Replace the Google OAuth button with the high converting [Google One Tap UI](https://stytch.com/docs/oauth#guides_google-sdk).
4. Secure your app further by building MFA authentication using methods like [WebAuthn](https://stytch.com/docs/sdks/javascript-sdk#webauthn).

## Get help and join the community

#### :speech_balloon: Stytch community Slack

Join the discussion, ask questions, and suggest new features in our ​[Slack community](https://join.slack.com/t/stytch/shared_invite/zt-nil4wo92-jApJ9Cl32cJbEd9esKkvyg)!

#### :question: Need support?

Check out the [Stytch Forum](https://forum.stytch.com/) or email us at [support@stytch.com](mailto:support@stytch.com).
