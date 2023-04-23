import cs from 'classnames';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PhotoPreview } from "src/model/photo";
import { useBreakpointMobile } from 'src/utils/breakpoint';
import { PhotoSelectContext } from './PhotoSelectContext';

import './PhotoPreviewView.scss';

interface Props {
  preview: PhotoPreview;
  href: string;

  onSelect?: (preview: PhotoPreview, shiftKey: boolean) => void;
}

export default function PhotoPreviewView(props: Props) {
  // props
  const { preview, href, onSelect } = props;
  const { id, thumbnail, type } = preview;

  // context
  const [{ selects, selectMode }, setState] = useContext(PhotoSelectContext);
  const selected = selects.includes(preview);
  const isMobile = useBreakpointMobile();

  // functions
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (selectMode) {
      e.preventDefault();
      onSelect?.(preview, e.shiftKey);
    }
  }

  const onCheckClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!isMobile && !selected && !selectMode) {
      e.preventDefault();
      setState({ selectMode: true });
      onSelect?.(preview, e.shiftKey);
    }
  }

  return (
    <Link to={href} className={cs('PhotoPreviewView', { selectMode, selected })} onClick={onClick}>
      <div className="ratio ratio-1x1">
        <img className="img-fluid" src={thumbnail} alt={id} loading="lazy" />
        <div className="icon_container">
          {type === 'VIDEO' && <div className="icon_wrapper"><i className="fas fa-play"></i></div>}
        </div>
        <div className="select_container">
          {selected
            ? <i className="fas fa-check-circle" onClick={onCheckClick} />
            : <i className="far fa-circle" onClick={onCheckClick} />
          }
        </div>
      </div>
    </Link>
  )
}
