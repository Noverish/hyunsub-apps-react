import { Link } from 'react-router-dom';
import { PhotoPreview } from "src/model/photo";

import './PhotoPreviewView.scss';

interface Props {
  preview: PhotoPreview;
  href: string;
}

export default function PhotoPreviewView({ preview, href }: Props) {
  const { id, thumbnail, type } = preview;

  return (
    <Link key={id} to={href} className="PhotoPreviewView">
      <div className="ratio ratio-1x1">
        <img className="img-fluid" src={thumbnail} alt={id} />
        <div className="icon_container">
          {type === 'VIDEO' && <div className="icon_wrapper"><i className="fas fa-play"></i></div>}
        </div>
      </div>
    </Link>
  )
}
