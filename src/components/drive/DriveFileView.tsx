import { DriveFileInfo, DriveFileType } from "src/model/drive"
import { DriveActions } from "src/pages/drive/DriveRedux";
import { useDispatch, useSelector } from "src/redux";
import cs from 'classnames';

import './DriveFileView.scss';

interface Props {
  info: DriveFileInfo;
}

function getIcon(type: DriveFileType): string {
  switch (type) {
    case 'FOLDER': return 'fas fa-folder';
    case 'IMAGE': return 'fas fa-image';
    case 'VIDEO': return 'fas fa-video';
    case 'AUDIO': return 'fas fa-volume-up';
    case 'TEXT': return 'fas fa-file-alt';
    case 'PDF': return 'fas fa-file-pdf';
    default: return 'fas fa-file';
  }
}

export default function DriveFileView({ info }: Props) {
  const dispatch = useDispatch();
  const { path, file } = useSelector(s => s.drive);
  const filePath = path + ((path === '/') ? '' : '/') + info.name;

  const selected = file === info;

  const onClick = () => {
    if (info.name === '../') {
      const segments = path.split('/');
      const newPath = segments.slice(0, segments.length - 1).join('/');
      const newPath2 = (newPath === '') ? '/' : newPath;
      dispatch(DriveActions.update({ path: newPath2 }));
      return;
    }

    if (info.type === 'FOLDER') {
      dispatch(DriveActions.update({ path: filePath }));
      return;
    }

    dispatch(DriveActions.update({ file: info }));
  }

  return (
    <div className={cs('DriveFileView', { selected })} onClick={onClick}>
      <div className={cs('icon', info.type.toLowerCase())}>
        <i className={getIcon(info.type)} />
      </div>
      <span className="name">{info.name}</span>
      <span className="size">{info.size}</span>
      <span className="date">{info.date}</span>
    </div>
  )
}
