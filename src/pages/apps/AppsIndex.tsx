import { Col, Row } from 'react-bootstrap';

import { useSelector } from 'src/redux';
import services from 'src/utils/services';

import './AppsIndex.scss';

export default function AppsIndex() {
  document.title = 'Hyunsub Apps';

  const authorities = useSelector((s) => s.global.tokenPayload?.authorities) || [];

  const items = services.filter((v) => authorities.includes(v.code));

  const elements = items.map((v) => (
    <Col key={v.code}>
      <a href={`https://${v.code}.hyunsub.kim`}>
        <i className={v.icon}></i>
        <span>{v.title}</span>
      </a>
    </Col>
  ));

  return (
    <div id="AppsIndex">
      <Row className="wrapper row-cols-2 g-5">{elements}</Row>
    </div>
  );
}
