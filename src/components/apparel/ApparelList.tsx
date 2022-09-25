import { Link } from "react-router-dom";
import { ApparelPreview } from "src/model/apparel";
import ApparelRoutes from 'src/pages/apparel/ApparelRoutes';

function ApparelPreviewComponent({ apparel }: { apparel: ApparelPreview; }) {
  return (
    <Link to={ApparelRoutes.detailRoute(apparel.id)} className="col d-block move_up_on_hover">
      <div className="ratio ratio-1x1">
        <img className="img-fluid rounded-1" src={apparel.thumbnail + '?size=512'} loading="lazy" alt={apparel.name} />
      </div>
      <div className="mt-2 text-break">{apparel.name}</div>
    </Link>
  )
}

interface ApparelListProps {
  apparels: ApparelPreview[];
}

export default function ApparelList({ apparels }: ApparelListProps) {
  const elements = apparels.map(v => <ApparelPreviewComponent key={v.id} apparel={v} />);

  return (
    <div id="ApparelList" className="row g-3 row-cols-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-6">
      {elements}
    </div>
  )
}
