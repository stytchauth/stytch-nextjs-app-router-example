import loadBackendStytch from "@/lib/loadBackendStytch";

interface Session {
  session_id: string;
  started_at: string;
  last_accessed_at: string;
  expires_at: string;
  attributes: {
    ip_address?: string;
    user_agent?: string;
  };
  authentication_factors: Array<{
    type: string;
    delivery_method?: string;
    email_factor?: {
      email_address: string;
    };
  }>;
}

async function getSessions(userId: string): Promise<Session[]> {
  const stytch = loadBackendStytch();
  
  try {
    const response = await stytch.sessions.get({ user_id: userId });
    return response.sessions || [];
  } catch (error) {
    console.error("Error fetching sessions:", error);
    return [];
  }
}

export default async function SessionsList({ userId }: { userId: string }) {
  const sessions = await getSessions(userId);

  if (sessions.length === 0) {
    return (
      <div className="card">
        <h2>Active Sessions</h2>
        <p>No active sessions found.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Active Sessions ({sessions.length})</h2>
      <p className="text-sm text-gray-600 mb-4">
        View all active sessions for your account using the Stytch Node SDK.
      </p>
      
      <h3>Session IDs</h3>
      <ul className="space-y-2">
        {sessions.map((session) => (
          <li key={session.session_id} className="text-sm">
            <code className="font-mono bg-gray-100 px-2 py-1 rounded">
              {session.session_id}
            </code>
          </li>
        ))}
      </ul>
    </div>
  );
} 