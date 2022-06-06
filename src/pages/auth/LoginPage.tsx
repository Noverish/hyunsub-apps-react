import { lazy, Suspense } from "react";

const VantaGlobe = lazy(() => import('../components/vanta/VantaGlobe'));

export default function LoginPage() {
  return (
    <div>
      <Suspense>
        <VantaGlobe />
      </Suspense>
      <h1>LoginPage</h1>
    </div>
  )
}
