import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SessionsList from "@/src/components/SessionsList";
import loadBackendStytch from "@/lib/loadBackendStytch";

// Server component to get user ID from cookies
async function getUserIdFromSession(): Promise<string | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("stytch_session");
  
  if (!sessionToken?.value) {
    return null;
  }

  try {
    const stytch = loadBackendStytch();
    
    // Get session details to extract user ID
    const response = await stytch.sessions.authenticate({
      session_token: sessionToken.value,
    });
    
    return response.user?.user_id || null;
  } catch (error) {
    console.error("Error authenticating session:", error);
    return null;
  }
}

export default async function SessionsPage() {
  const userId = await getUserIdFromSession();

  if (!userId) {
    redirect("/");
  }

  return (
    <div className="container">
      <div className="card">
        <h1>Session Management</h1>
        <p className="text-gray-600 mb-6">
          View and manage your active sessions across different devices and browsers.
        </p>
      </div>

      <Suspense fallback={<div className="card">Loading sessions...</div>}>
        <SessionsList userId={userId} />
      </Suspense>
    </div>
  );
} 