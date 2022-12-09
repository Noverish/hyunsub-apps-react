import { Col, Row } from "react-bootstrap";

import './AppsIndex.scss';

export default function AppsIndex() {
  return (
    <div id="AppsIndex">
      <div className="wrapper">
        <Row>
          <Col>
            <a href="https://video.hyunsub.kim">
              <i className="fas fa-film"></i>
              <span>Video</span>
            </a>
          </Col>
          <Col>
            <a href="https://photo.hyunsub.kim">
              <i className="fas fa-camera"></i>
              <span>Photo</span>
            </a>
          </Col>
        </Row>
        <Row>
          <Col>
            <a href="https://apparel.hyunsub.kim">
              <i className="fas fa-tshirt"></i>
              <span>Apparel</span>
            </a>
          </Col>
          <Col>
            <a href="https://drive.hyunsub.kim">
              <i className="fas fa-hdd"></i>
              <span>Drive</span>
            </a>
          </Col>
        </Row>
        <Row>
          <Col>
            <a href="https://archive.hyunsub.kim">
              <i className="fas fa-archive"></i>
              <span>Archive</span>
            </a>
          </Col>
          <Col>
            <a href="https://git.hyunsub.kim">
              <i className="fab fa-git-alt"></i>
              <span>Git</span>
            </a>
          </Col>
        </Row>
      </div>
    </div>
  )
}