import { RouteObject } from 'react-router-dom';

import { useTokenPayload } from 'src/hooks/token';
import services from 'src/utils/services';

import './AppsIndex.scss';

function AppsIndex() {
  document.title = 'Hyunsub Apps';

  const { authorities } = useTokenPayload();

  const items = services.filter((v) => authorities.includes(v.code));

  const elements = items.map((v) => (
    <a key={v.code} href={`https://${v.code}.hyunsub.kim`}>
      <i className={v.icon}></i>
      <span>{v.title}</span>
    </a>
  ));

  return (
    <div id="AppsIndex">
      <div className="wrapper d-grid row-col-2 gap-5">{elements}</div>
    </div>
  );
}

export const AppsRouteObjects: RouteObject[] = [
  {
    path: '/',
    element: <AppsIndex />,
  },
];
