import { Col, Row } from 'react-bootstrap';

import { useTokenPayload } from 'src/hooks/token';
import services from 'src/utils/services';

import './MenuAppsView.scss';

interface Props {}

export default function MenuAppsView(props: Props) {
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
    <div className="MenuAppsView">
      <Row className="row-cols-4 gx-2 gy-4">{elements}</Row>
    </div>
  );
}
