import { useCallback, useContext } from 'react';
import { Button } from 'react-bootstrap';
import useDragAndDrop from 'src/hooks/drag-and-drop-hook';
import { FileWithPath } from 'src/model/file';
import cs from 'classnames';
import { PhotoUploadContext, PhotoUploadFileItem } from '../PhotoUploadContext';

import './PhotoFileUpload.scss';

const accept = "image/jpeg,image/png,image/gif,video/mp4,video/quicktime";

interface Props {

}

export default function PhotoFileUpload(props: Props) {
  const setState = useContext(PhotoUploadContext)[1];

  const onFileDrop = useCallback((files: FileWithPath[]) => {
    const list: PhotoUploadFileItem[] = files.map(file => ({
      file: file.file,
      path: file.path,
      progress: 0,
      status: 'ready',
    }))
    setState({ items: list });
  }, [setState]);

  const { props: dragAndDropProps, hover, onInputChange } = useDragAndDrop({ accept, onFileDrop });

  return (
    <div className={cs("PhotoFileUpload ratio", { hover })} {...dragAndDropProps}>
      <div className="wrapper">
        <i className="fas fa-images"></i>
        <div className="drag">Drag & Drop</div>
        <div className="or">or</div>
        <Button>Browse</Button>
      </div>
      <input type="file" multiple onChange={onInputChange} accept={accept} />
    </div>
  )
}
