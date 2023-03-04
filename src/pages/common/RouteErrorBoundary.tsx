import { useRouteError } from "react-router-dom";

export default function RouteErrorBoundary() {
  const error = useRouteError() as Error;

  return (
    <div className="RouteErrorBoundary">
      <h1>RouteErrorBoundary</h1>
      <pre><code>{error.stack}</code></pre>
    </div>
  )
}
