import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as stytch from 'stytch';


const stytchClient = new stytch.Client({
  project_id: process.env.STYTCH_PROJECT_ID || '',
  secret: process.env.STYTCH_SECRET || '',
  env: process.env.STYTCH_PROJECT_ENV === 'live' ? stytch.envs.live : stytch.envs.test,
});

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const response = await stytchClient.sessions.authenticate({
      session_token: request.cookies.get('stytch_session')?.value,
    });
    console.log(response);
    return NextResponse.json(response);
  } catch (error) {
      console.log(error);
      return NextResponse.json(error);
  }
}
