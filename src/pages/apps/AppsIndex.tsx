import { Col, Row } from 'react-bootstrap';
import { RouteObject } from 'react-router-dom';

import { useTokenPayload } from 'src/hooks/token';
import services from 'src/utils/services';

import './AppsIndex.scss';

function AppsIndex() {
  document.title = 'Hyunsub Apps';

  const { authorities } = useTokenPayload();

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

export const AppsRouteObjects: RouteObject[] = [
  {
    path: '/',
    element: <AppsIndex />,
  },
];
