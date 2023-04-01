import { ProgressBar, Spinner } from 'react-bootstrap';
import { PhotoUploadFileItem } from 'src/pages/photo/upload/PhotoUploadContext';
import cs from 'classnames';
import { useMemo } from 'react';

import './PhotoUploadImage.scss';

interface Props {
  item: PhotoUploadFileItem;
}

export default function PhotoUploadImage({ item }: Props) {
  const { file, path, status, progress, preview } = item;
  const isImage = file.type.startsWith('image');

  const objectUrl = useMemo(() => isImage ? URL.createObjectURL(file) : '', [isImage, file]);

  const src = preview ? preview.thumbnail : objectUrl;

  const thumbnail = (isImage || preview)
    ? <img className="img-fluid" src={src} alt={path} loading="lazy" />
    : (
      <div className="flex_center border text-break p-2 text-center">
        <i className="fas fa-file-video mb-2" />
        <div>{file.name}</div>
      </div>
    )

  return (
    <div className="PhotoUploadImage ratio ratio-1x1">
      {thumbnail}
      <div className={cs("dim flex_center", { 'd-none': status === 'ready' })}>
        {status === 'uploading' && <ProgressBar now={progress} label={`${progress}%`} />}
        {status === 'registering' && <Spinner animation="border" variant="primary" />}
        {status === 'success' && <i className="fas fa-check text-primary" />}
        {status === 'error' && <i className="fas fa-times text-danger" />}
      </div>
    </div>
  )
}
