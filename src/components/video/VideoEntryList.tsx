import { Link } from "react-router-dom";
import { VideoEntry } from "src/model/video";
import routes from 'src/pages/video/VideoRoutes';

import './VideoEntryList.scss';

interface Props {
  entries: VideoEntry[];
}

export default function VideoEntryList({ entries }: Props) {
  const elements = entries.map(entry => (
    <Link key={entry.id} to={routes.getDetailRoute(entry.id)} className="col d-block move_up_on_hover">
      <div className="ratio">
        <img className="img-fluid rounded-1" src={entry.thumbnail} loading="lazy" />
      </div>
      <div className="mt-2 text-break">{entry.name}</div>
    </Link>
  ));

  return (
    <div id="VideoEntryList" className="row g-3 row-cols-2 row-cols-md-4 row-cols-xl-6">
      {elements}
    </div>
  )
}
