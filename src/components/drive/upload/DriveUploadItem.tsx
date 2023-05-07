import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import DriveFileIcon from '../DriveFileIcon';
import { DriveUploadStatus } from 'src/model/drive';
import { getHumanReadableSize } from 'src/utils/index';

import './DriveUploadItem.scss';

interface Props {
  status: DriveUploadStatus;
}

export default function DriveUploadItem({ status }: Props) {
  const { name, size, progress } = status;

  const sizeStr = getHumanReadableSize(size);

  return (
    <tr className="DriveUploadItem">
      <td className="icon">
        <DriveFileIcon name={name} isDir={false} />
      </td>
      <td className="info">
        <div className="name">{name}</div>
        <div className="size">{sizeStr}</div>
      </td>
      <td className="status">
        <CircularProgressbar
          value={progress}
          text={`${progress}%`}
          strokeWidth={12}
          styles={buildStyles({
            strokeLinecap: 'butt',
            textColor: '#FFF',
            pathColor: '#FFF',
            trailColor: '#888',
          })}
        />
      </td>
    </tr>
  );
}
