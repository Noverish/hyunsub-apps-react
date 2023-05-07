import { Spinner } from 'react-bootstrap';

export default function LoadingPage() {
  return (
    <div id="LoadingPage" className="flex_center" style={{ height: '100vh' }}>
      <Spinner animation="border"></Spinner>
    </div>
  );
}
