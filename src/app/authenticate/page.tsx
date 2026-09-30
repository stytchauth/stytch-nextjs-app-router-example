import { Suspense } from "react";
import Authenticate from "@/src/components/Authenticate";

export default function AuthenticatePage() {
  // Authenticate reads the magic link token via useSearchParams(), which must
  // be inside a Suspense boundary for the page to be prerendered.
  return (
    <Suspense>
      <Authenticate />
    </Suspense>
  );
}
