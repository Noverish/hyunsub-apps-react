import { Card } from "react-bootstrap";

interface Props {
  result: any;
}

export default function ApiResultCard({ result }: Props) {
  return (
    <Card>
      <Card.Header>Result</Card.Header>
      <Card.Body>
        <pre><code>{JSON.stringify(result, null, 4)}</code></pre>
      </Card.Body>
    </Card>
  )
}
