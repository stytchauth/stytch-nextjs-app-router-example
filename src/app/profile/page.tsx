"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStytchUser } from "@stytch/nextjs";
import Profile from "@/src/components/Profile";

export default function ProfilePage() {
  const { user, isInitialized } = useStytchUser();
  const router = useRouter();

  // If the Stytch SDK no longer has a User then redirect to login; for example after logging out.
  useEffect(() => {
    if (isInitialized && !user) {
      router.replace("/");
    }
  }, [user, isInitialized, router]);

  return <Profile />;
}
