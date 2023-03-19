import { Link } from "react-router-dom";
import { AlbumPreview } from "src/model/photo"

interface Props {
  preview: AlbumPreview;
  href: string;
}

export default function AlbumPreviewView({ preview, href }: Props) {
  const { name, thumbnail } = preview;

  return (
    <Link to={href} className="AlbumPreviewView">
      <div className="ratio ratio-1x1">
        <img className="img-fluid" src={thumbnail} alt={name} />
      </div>
      <div className="mt-2">{name}</div>
    </Link>
  )
}
