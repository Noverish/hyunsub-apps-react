import { Link } from 'react-router-dom';

import { ComicPreview } from 'src/model/comic';
import ComicRoutes from 'src/pages/comic/ComicRoutes';

import './ComicPreviewView.scss';

interface Props {
  comic: ComicPreview;
}

export default function ComicPreviewView({ comic }: Props) {
  const href = ComicRoutes.detailRoute(comic.id);
  const style: any = { '--bs-aspect-ratio': '141.4%' };

  return (
    <Link to={href} className="ComicPreviewView col move_up_on_hover">
      <div className="ratio" style={style}>
        <img className="thumbnail" src={comic.thumbnail} loading="lazy" alt={comic.title} />
      </div>
      <div className="title">{comic.title}</div>
    </Link>
  );
}
