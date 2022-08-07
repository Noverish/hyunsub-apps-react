import { Spinner } from "react-bootstrap";

export default function LoadingPage() {
  return (
    <div id="LoadingPage" className="h-100 flex_center">
      <Spinner animation="border"></Spinner>
    </div>
  )
}
