import { t } from 'i18next';
import { useContext } from 'react';
import { Button, ProgressBar } from 'react-bootstrap';

import PhotoUploadHooks from '../PhotoUploadHooks';
import PhotoUploadItem from './PhotoUploadItem';
import { PhotoUploadContext } from 'src/pages/photo/upload/PhotoUploadContext';

import './PhotoUploadList.scss';

interface Props {
  albumId?: string;
}

export default function PhotoUploadList({ albumId }: Props) {
  const [state] = useContext(PhotoUploadContext);
  const { items } = state;

  const elements = items.map((v) => <PhotoUploadItem key={v.file.path} info={v} />);

  const completeNum = items.filter((v) => v.progress === 100).length;

  return (
    <div className="PhotoUploadList">
      <div className="header">
        <div className="status">{t('upload.status', { now: completeNum, total: items.length })}</div>
        <PhotoUploadListButton albumId={albumId} />
      </div>
      <hr />
      <PhotoUploadListProgressBar />
      <div className="d-grid gap-2 row-col-3 row-col-md-6">{elements}</div>
    </div>
  );
}

function PhotoUploadListButton({ albumId }: Props) {
  const [{ status }] = useContext(PhotoUploadContext);

  const upload = PhotoUploadHooks.useUpload(albumId);
  const abort = PhotoUploadHooks.useAbort();
  const clear = PhotoUploadHooks.useClear();

  if (status === 'ready') {
    return (
      <div>
        <Button onClick={clear} variant="secondary" className="me-2">
          {t('upload.clear')}
        </Button>
        <Button onClick={upload}>{t('upload.upload')}</Button>
      </div>
    );
  }

  if (status === 'uploading') {
    return (
      <Button variant="danger" onClick={abort}>
        {t('upload.abort')}
      </Button>
    );
  }

  return <Button onClick={clear}>{t('upload.clear')}</Button>;
}

function PhotoUploadListProgressBar() {
  const [{ status, progress }] = useContext(PhotoUploadContext);

  if (status === 'ready') {
    return <ProgressBar now={0} label={t('upload.ready')} variant="info" />;
  }

  if (status === 'uploading') {
    return <ProgressBar now={progress} label={`${progress}%`} animated />;
  }

  if (status === 'success') {
    return <ProgressBar now={100} label={t('upload.completed')} variant="success" />;
  }

  if (status === 'aborted') {
    return <ProgressBar now={progress} label={t('upload.aborted')} variant="warning" />;
  }

  if (status === 'error') {
    return <ProgressBar now={progress} label={t('error')} variant="danger" />;
  }
}
