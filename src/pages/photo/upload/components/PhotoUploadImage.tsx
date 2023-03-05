import { Spinner } from 'react-bootstrap';
import { PhotoUploadFileItem } from 'src/pages/photo/upload/PhotoUploadContext';
import cs from 'classnames';

import './PhotoUploadImage.scss';

interface Props {
  item: PhotoUploadFileItem;
}

export default function PhotoUploadImage({ item }: Props) {
  const { file, path, status } = item;

  return (
    <div className="PhotoUploadImage ratio ratio-1x1">
      <img className="img-fluid" src={URL.createObjectURL(file)} alt={path} />
      <div className={cs("dim flex_center", { 'd-none': status === 'ready' })}>
        {status === 'uploading' && <Spinner animation="border" />}
        {status === 'registering' && <Spinner animation="border" variant="primary" />}
        {status === 'success' && <i className="fas fa-check text-primary" />}
        {status === 'error' && <i className="fas fa-times text-danger" />}
      </div>
    </div>
  )
}
