import { useMemo } from 'react';
import { ProgressBar, Spinner } from 'react-bootstrap';

import { PhotoUploadItemInfo } from 'src/model/photo';

import './PhotoUploadItem.scss';

interface Props {
  info: PhotoUploadItemInfo;
}

export default function PhotoUploadItem({ info }: Props) {
  const { file, status, preview } = info;
  const isImage = file.type.startsWith('image');

  const objectUrl = useMemo(() => (isImage ? URL.createObjectURL(file.file) : ''), [isImage, file]);

  const src = preview ? preview.thumbnail : objectUrl;

  const thumbnail =
    isImage || preview ? (
      <img className="img-fluid" src={src} alt={file.path} loading="lazy" />
    ) : (
      <div className="flex_center border text-break p-2 text-center">
        <i className="fas fa-file-video mb-2" />
        <div>{file.file.name}</div>
      </div>
    );

  return (
    <div className="PhotoUploadItem ratio ratio-1x1">
      {thumbnail}
      {status !== 'ready' && <div className="dim flex_center">{renderDimContent(info)}</div>}
    </div>
  );
}

function renderDimContent(info: PhotoUploadItemInfo): React.ReactNode {
  const { status, progress } = info;

  if (status === 'ready') {
    return undefined;
  }

  if (status === 'uploading') {
    return <ProgressBar now={progress} label={`${progress}%`} animated />;
  }

  if (status === 'uploaded') {
    return <Spinner animation="border" variant="primary" />;
  }

  if (status === 'success') {
    return <i className="fas fa-check text-green" />;
  }

  console.log('status', status);
  return <i className="fas fa-times text-danger" />;
}
