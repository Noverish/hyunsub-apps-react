import React from "react";
import { VideoCategory, VideoEntry } from "src/model/video";
import { loadVideoDetail } from "src/pages/video/list/VideoListContext";
import VideoRoutes from 'src/pages/video/VideoRoutes';
import { useDispatch } from "src/redux";
import cs from 'classnames';

import './VideoEntryList.scss';

interface Props {
  category: VideoCategory,
  entries: VideoEntry[];
}

export default function VideoEntryList({ category, entries }: Props) {
  const dispatch = useDispatch();

  const style: any = category.itemCss && JSON.parse(category.itemCss);

  const elements = entries.map(entry => {
    const href = VideoRoutes.detailRoute(entry.id);

    const onClick = (e: React.MouseEvent) => {
      e.preventDefault();
      dispatch(loadVideoDetail(entry.id));
    };

    return (
      <a key={entry.id} href={href} className="col d-block move_up_on_hover" onClick={onClick}>
        <div className="ratio" style={style}>
          <img className="img-fluid rounded-1" src={entry.thumbnail} loading="lazy" alt={entry.name} />
        </div>
        <div className="mt-2 text-break">{entry.name}</div>
      </a>
    )
  });

  return (
    <div id="VideoEntryList" className={cs('row g-3', category.listHtmlClass)}>
      {elements}
    </div>
  )
}
