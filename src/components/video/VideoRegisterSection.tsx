import { Card } from 'react-bootstrap';
import PathSearchSelect from '../common/PathSearchSelect';

export default function VideoRegisterSection() {
  return (
    <Card>
      <Card.Header>Register Video</Card.Header>
      <Card.Body>
        <PathSearchSelect />
      </Card.Body>
    </Card>
  )
}
