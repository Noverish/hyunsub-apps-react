import cs from 'classnames';
import { useCallback, useContext } from 'react';
import { Button } from 'react-bootstrap';

import { PhotoUploadContext, PhotoUploadFileItem } from '../PhotoUploadContext';
import useDragAndDrop from 'src/hooks/drag-and-drop-hook';
import { FileWithPath } from 'src/model/file';

import './PhotoFileUpload.scss';

const accept = 'image/jpeg,image/png,image/gif,video/mp4,video/quicktime';

export default function PhotoFileUpload() {
  const setState = useContext(PhotoUploadContext)[1];

  const onFileDrop = useCallback(
    (files: FileWithPath[]) => {
      const list: PhotoUploadFileItem[] = files.map((file) => ({
        file,
        progress: 0,
        status: 'ready',
      }));
      setState({ items: list });
    },
    [setState],
  );

  const { props: dragAndDropProps, hover, onInputChange } = useDragAndDrop({ accept, onFileDrop });

  return (
    <div className={cs('PhotoFileUpload ratio', { hover })} {...dragAndDropProps}>
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
