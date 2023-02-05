import { Col, Row } from "react-bootstrap";
import { useSelector } from "src/redux";
import services from "src/utils/services";

import './AppsIndex.scss';

export default function AppsIndex() {
  document.title = 'Hyunsub Apps';

  const authorities = useSelector(s => s.global.tokenPayload?.authorities) || [];

  const items = services.filter(v => authorities.includes(v.name));

  const elements = items.map(v => (
    <Col key={v.name}>
      <a href={`https://${v.name}.hyunsub.kim`}>
        <i className={v.icon}></i>
        <span>{v.title}</span>
      </a>
    </Col>
  ))

  return (
    <div id="AppsIndex">
      <div className="wrapper">
        <Row className="row-cols-2 g-5">
          {elements}
        </Row>
      </div>
    </div>
  )
}
