import React from "react";
import { VideoEntry } from "src/model/video";
import { loadVideoDetail } from "src/pages/video/list/VideoListContext";
import VideoRoutes from 'src/pages/video/VideoRoutes';
import { useDispatch } from "src/redux";

import './VideoEntryList.scss';

interface Props {
  entries: VideoEntry[];
}

export default function VideoEntryList({ entries }: Props) {
  const dispatch = useDispatch();

  const elements = entries.map(entry => {
    const href = VideoRoutes.getDetailRoute(entry.id);

    const onClick = (e: React.MouseEvent) => {
      e.preventDefault();
      dispatch(loadVideoDetail(entry.id));
    };

    return (
      <a key={entry.id} href={href} className="col d-block move_up_on_hover" onClick={onClick}>
        <div className="ratio">
          <img className="img-fluid rounded-1" src={entry.thumbnail} loading="lazy" alt={entry.name} />
        </div>
        <div className="mt-2 text-break">{entry.name}</div>
      </a>
    )
  });

  return (
    <div id="VideoEntryList" className="row g-3 row-cols-2 row-cols-md-4 row-cols-xl-6">
      {elements}
    </div>
  )
}
