import { useRouteError } from "react-router-dom";

export default function ErrorBoundary() {
  const error = useRouteError() as Error;

  return (
    <div className="ErrorBoundary">
      <h1>ErrorBoundary</h1>
      <pre><code>{error.stack}</code></pre>
    </div>
  )
}
