import { useSelector } from 'src/redux';
import services from 'src/utils/services';
import { Row, Col } from 'react-bootstrap';

import './MenuAppsView.scss';

interface Props {

}

export default function MenuAppsView(props: Props) {
  const authorities = useSelector(s => s.global.tokenPayload?.authorities) || [];
  const items = services.filter(v => authorities.includes(v.code));

  const elements = items.map(v => (
    <Col key={v.code}>
      <a href={`https://${v.code}.hyunsub.kim`}>
        <i className={v.icon}></i>
        <span>{v.title}</span>
      </a>
    </Col>
  ))

  return (
    <div className="MenuAppsView">
      <Row className="row-cols-4 gx-2 gy-4">
        {elements}
      </Row>
    </div>
  )
}
