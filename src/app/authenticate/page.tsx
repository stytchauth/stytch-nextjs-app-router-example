import { Suspense } from "react";
import Authenticate from "@/src/components/Authenticate";

export default function AuthenticatePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Authenticate />
    </Suspense>
  );
}
