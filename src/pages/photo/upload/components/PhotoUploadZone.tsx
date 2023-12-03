import cs from 'classnames';
import { Button } from 'react-bootstrap';

import PhotoUploadHooks from '../PhotoUploadHooks';
import useDragAndDrop from 'src/hooks/drag-and-drop-hook';

import './PhotoUploadZone.scss';

const accept = 'image/jpeg,image/png,image/gif,video/mp4,video/quicktime';

export default function PhotoUploadZone() {
  const ready = PhotoUploadHooks.useReady();

  const { props: dragAndDropProps, hover, onInputChange } = useDragAndDrop({ accept, onFileDrop: ready });

  return (
    <div className={cs('PhotoUploadZone ratio', { hover })} {...dragAndDropProps}>
      <div className="wrapper">
        <i className="fas fa-images"></i>
        <div className="drag">Drag & Drop</div>
        <div className="or">or</div>
        <Button>Browse</Button>
      </div>
      <input type="file" multiple onChange={onInputChange} accept={accept} />
    </div>
  );
}
