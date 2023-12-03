import { t } from 'i18next';
import { useContext } from 'react';
import { Button, ProgressBar } from 'react-bootstrap';

import { DriveUploadContext } from './DriveUploadContext';
import DriveUploadHooks from './DriveUploadHooks';
import DriveUploadItem from './DriveUploadItem';

import './DriveUploadModal.scss';
import 'react-circular-progressbar/dist/styles.css';

export default function DriveUploadModal() {
  const [{ items }] = useContext(DriveUploadContext);

  const elements = items.map((v) => <DriveUploadItem key={v.file.path} info={v} />);

  const completeNum = items.filter((v) => v.progress === 100).length;

  return (
    <div className="DriveUploadModal">
      <div className="header">
        <div className="top_bar">
          <span>{t('upload.status', { now: completeNum, total: items.length })}</span>
          <DriveUploadModalButton />
        </div>
        <DriveUploadModalProgressBar />
      </div>
      <div className="body">
        <table>
          <tbody>{elements}</tbody>
        </table>
      </div>
    </div>
  );
}

function DriveUploadModalButton() {
  const [{ status }] = useContext(DriveUploadContext);

  const upload = DriveUploadHooks.useUpload();
  const abort = DriveUploadHooks.useAbort();
  const clear = DriveUploadHooks.useClear();

  if (status === 'ready') {
    return <Button onClick={upload}>{t('upload.upload')}</Button>;
  }

  if (status === 'uploading') {
    return (
      <Button variant="danger" onClick={abort}>
        {t('upload.abort')}
      </Button>
    );
  }

  return (
    <div className="close" onClick={clear}>
      <i className="fas fa-times" />
    </div>
  );
}

function DriveUploadModalProgressBar() {
  const [{ status, progress }] = useContext(DriveUploadContext);

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
