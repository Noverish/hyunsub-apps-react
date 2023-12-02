import { Link } from 'react-router-dom';

import { ApparelPreview } from 'src/model/apparel';
import ApparelRoutes from 'src/pages/apparel/ApparelRoutes';

interface Props {
  apparel: ApparelPreview;
}

export default function ApparelPreviewItem({ apparel }: Props) {
  return (
    <Link to={ApparelRoutes.detail(apparel.id)} className="ApparelPreviewItem col d-block move_up_on_hover">
      <div className="ratio ratio-1x1">
        <img className="img-fluid" src={apparel.thumbnail + '?size=512'} loading="lazy" alt={apparel.name} />
      </div>
      <div className="mt-2 text-break">{apparel.name}</div>
    </Link>
  );
}
