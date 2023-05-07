import { Spinner } from 'react-bootstrap';

import './LoadingPage.scss';

export default function LoadingPageDim() {
  return (
    <div id="LoadingPageDim" className="flex_center">
      <Spinner animation="border"></Spinner>
    </div>
  );
}
