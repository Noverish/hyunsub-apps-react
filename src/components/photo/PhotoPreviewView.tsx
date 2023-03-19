import { Link } from 'react-router-dom';
import { PhotoPreview } from "src/model/photo";
import cs from 'classnames';

import './PhotoPreviewView.scss';

interface Props {
  preview: PhotoPreview;
  href: string;

  selectMode?: boolean;
  selected?: boolean;
  onSelect?: (preview: PhotoPreview, shiftKey: boolean) => void;
}

export default function PhotoPreviewView(props: Props) {
  const { preview, href, selected, selectMode, onSelect } = props;
  const { id, thumbnail, type } = preview;

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (selectMode) {
      e.preventDefault();
      onSelect?.(preview, e.shiftKey);
    }
  }

  return (
    <Link to={href} className={cs('PhotoPreviewView', { selectMode, selected })} onClick={onClick}>
      <div className="ratio ratio-1x1">
        <img className="img-fluid" src={thumbnail} alt={id} />
        <div className="icon_container">
          {type === 'VIDEO' && <div className="icon_wrapper"><i className="fas fa-play"></i></div>}
        </div>
        <div className="status_container" />
        <div className="select_container">
          {selected
            ? <i className="fas fa-check-circle" />
            : <i className="far fa-circle" />
          }
        </div>
      </div>
    </Link>
  )
}
