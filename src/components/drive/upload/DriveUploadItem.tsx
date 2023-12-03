import { t } from 'i18next';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import DriveFileIcon from '../DriveFileIcon';
import { DriveUploadItemInfo } from 'src/model/drive';
import { getHumanReadableSize } from 'src/utils/index';

import './DriveUploadItem.scss';

interface Props {
  info: DriveUploadItemInfo;
}

export default function DriveUploadItem({ info }: Props) {
  const { file } = info;

  const sizeStr = getHumanReadableSize(file.file.size);

  return (
    <tr className="DriveUploadItem">
      <td className="icon">
        <DriveFileIcon path={file.path} isDir={false} />
      </td>
      <td className="info">
        <div className="name">{file.path}</div>
        <div className="size">{sizeStr}</div>
      </td>
      <td className="status">
        <DriveUploadItemProgressBar info={info} />
      </td>
    </tr>
  );
}

function DriveUploadItemProgressBar({ info }: Props) {
  const { status, progress } = info;

  if (status === 'ready') {
    return renderDriveUploadItemProgressBar(0, t('upload.ready'), '#ffffff');
  }

  if (status === 'uploading') {
    return renderDriveUploadItemProgressBar(progress, `${progress}%`, '#0d6efd');
  }

  if (status === 'uploaded') {
    return renderDriveUploadItemProgressBar(100, t('upload.completed'), '#198754');
  }

  return renderDriveUploadItemProgressBar(progress, t('error'), '#dc3545');
}

function renderDriveUploadItemProgressBar(value: number, text: string, pathColor: string) {
  return (
    <CircularProgressbar
      value={value}
      text={text}
      strokeWidth={12}
      styles={buildStyles({
        strokeLinecap: 'butt',
        textColor: '#FFF',
        pathColor: pathColor,
        trailColor: '#888',
      })}
    />
  );
}
