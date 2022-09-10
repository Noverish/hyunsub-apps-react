import { Link } from 'react-router-dom';
import { Photo } from "src/model/photo";
import routes from 'src/pages/photo/PhotoRoutes';

import './PhotoThumbnail.scss';

interface Props {
  albumId: number;
  photo: Photo;
}

export default function PhotoThumbnail({ albumId, photo }: Props) {
  const { id, thumbnail, url, liveVideo } = photo;
  const isVideo = /\.mp4$/i.test(url);

  return (
    <Link key={id} to={routes.albumViewer(albumId, id)} className="move_up_on_hover">
      <div className="ratio ratio-1x1">
        <img className="img-fluid" src={thumbnail} alt={thumbnail} />
        {isVideo && <div className="thumbnail_video_icon">
          <div>
            <i className="fas fa-play"></i>
          </div>
        </div>}
        {liveVideo && <div className="thumbnail_video_icon">
          <div className="p-1">
            <img src="/img/live-photo.svg" className="w-100 h-100 opacity-75" alt="svg" />
          </div>
        </div>}
      </div>
    </Link>
  )
}
