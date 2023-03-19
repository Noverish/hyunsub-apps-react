import { Link } from "react-router-dom";
import { AlbumPreview } from "src/model/photo"

import './AlbumPreviewView.scss';

interface Props {
  preview: AlbumPreview;
  onClick: string | ((preview: AlbumPreview) => void);
}

export default function AlbumPreviewView({ preview, onClick }: Props) {
  const { name, thumbnail } = preview;

  const content = (
    <>
      <div className="ratio ratio-1x1">
        <img className="img-fluid" src={thumbnail} alt={name} />
      </div>
      <div className="name">{name}</div>
    </>
  )

  if (typeof onClick === 'string') {
    return <Link className="AlbumPreviewView" to={onClick}>{content}</Link>
  } else {
    return <div className="AlbumPreviewView" onClick={() => onClick(preview)}>{content}</div>
  }
}
