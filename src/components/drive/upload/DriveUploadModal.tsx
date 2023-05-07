import { useContext } from 'react';
import { ProgressBar } from 'react-bootstrap';
import 'react-circular-progressbar/dist/styles.css';

import { DriveUploadContext } from './DriveUploadContext';
import { useDriveUploadClose } from './DriveUploadHooks';
import DriveUploadItem from './DriveUploadItem';

import './DriveUploadModal.scss';

export default function DriveUploadModal() {
  const [{ items, progress, aborted }] = useContext(DriveUploadContext);
  const close = useDriveUploadClose();

  const elements = items.map((v) => <DriveUploadItem key={v.name} status={v} />);

  const completeNum = items.filter((v) => v.progress === 100).length;

  return (
    <div className="DriveUploadModal">
      <div className="header">
        <div className="top_bar">
          <span>
            {completeNum} / {items.length}개 완료
          </span>
          <div className="minimize">
            <i className="fas fa-minus" />
          </div>
          <div className="close" onClick={close}>
            <i className="fas fa-times" />
          </div>
        </div>
        <ProgressBar now={progress} variant={aborted ? 'danger' : undefined} animated={!aborted && progress !== 100} label={`${progress}%`} />
      </div>
      <div className="body">
        <table>
          <tbody>{elements}</tbody>
        </table>
      </div>
    </div>
  );
}
