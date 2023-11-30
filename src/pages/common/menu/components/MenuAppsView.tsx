import { useTokenPayload } from 'src/hooks/token';
import services from 'src/utils/services';

import './MenuAppsView.scss';

export default function MenuAppsView() {
  const { authorities } = useTokenPayload();
  const items = services.filter((v) => authorities.includes(v.code));

  const elements = items.map((v) => (
    <a key={v.code} href={`https://${v.code}.hyunsub.kim`}>
      <i className={v.icon}></i>
      <span>{v.title}</span>
    </a>
  ));

  return (
    <div className="MenuAppsView">
      <div className="d-grid row-col-4 gap-4">{elements}</div>
    </div>
  );
}
