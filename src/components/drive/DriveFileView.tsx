import cs from 'classnames';
import React from 'react';
import { DriveFileInfo, DriveFileType } from "src/model/drive";
import { driveFileClickAction } from 'src/pages/drive/DriveContext';
import { useDriveStatus } from 'src/pages/drive/DriveHooks';
import { useDispatch, useSelector } from "src/redux";

import './DriveFileView.scss';

interface Props {
  info: DriveFileInfo;
  index: number;
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

export default function DriveFileView({ info, index }: Props) {
  const dispatch = useDispatch();
  const { path, selects } = useDriveStatus(index);
  const selected = selects.includes(info.name);

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch(driveFileClickAction(index, info, e));
  }

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('moves', JSON.stringify(selects));
    e.dataTransfer.setData('path', path);
  }

  return (
    <div className={cs('DriveFileView', { selected })} onClick={onClick} draggable onDragStart={onDragStart}>
      <div className={cs('icon', info.type.toLowerCase())}>
        <i className={getIcon(info.type)} />
      </div>
      <span className="name">{info.name}</span>
      <span className="size">{info.size}</span>
      <span className="date">{info.date}</span>
    </div>
  )
}
