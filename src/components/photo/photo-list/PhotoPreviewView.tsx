import cs from 'classnames';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { PhotoSelectContext } from './PhotoSelectContext';
import SelectIndicator from 'src/components/common/SelectIndicator';
import { PhotoPreview } from 'src/model/photo';

import './PhotoPreviewView.scss';

interface Props {
  preview: PhotoPreview;
  href: string;

  onSelect?: (preview: PhotoPreview, shiftKey: boolean) => void;
}

export default function PhotoPreviewView(props: Props) {
  // props
  const { preview, href } = props;
  const { id, thumbnail, type } = preview;

  // hooks
  const [{ selects, selectMode }] = useContext(PhotoSelectContext);
  const selected = selects.includes(preview);

  // functions
  const onSelect = (nextState: boolean, e: React.MouseEvent<HTMLElement>) => {
    props.onSelect?.(preview, e.shiftKey);
  };

  return (
    <Link to={href} className={cs('PhotoPreviewView', { selectMode, selected })}>
      <div className="ratio ratio-1x1">
        <img className="img-fluid" src={thumbnail} alt={id} loading="lazy" />
        <div className="icon_container">
          {type === 'VIDEO' && (
            <div className="icon_wrapper">
              <i className="fas fa-play"></i>
            </div>
          )}
        </div>
        <SelectIndicator enable={selectMode} selected={selected} onSelect={onSelect} />
      </div>
    </Link>
  );
}
