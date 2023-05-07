import cs from 'classnames';
import { join } from 'path-browserify';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import DriveFileIcon from '../DriveFileIcon';
import { DriveExplorerContext } from './DriveExplorerContext';
import { useDriveExplorerFileSelect, useDriveExplorerPath } from 'src/components/drive/explorer/DriveExplorerHooks';
import { useDriveFileRename } from 'src/components/drive/explorer/DriveFileHooks';
import { DriveFileInfo } from 'src/model/drive';
import DriveRoutes from 'src/pages/drive/DriveRoutes';

import './DriveExplorerFileItem.scss';

interface Props {
  file: DriveFileInfo;
}

function renderDragImage(num: number): HTMLCanvasElement {
  const canvas = window.document.createElement('canvas');
  canvas.style.backgroundColor = 'transparent';
  canvas.style.position = 'fixed';
  canvas.width = 48;
  canvas.height = 48;
  const margin = 12;
  const contentSize = 24;

  const ctx = canvas.getContext('2d')!!;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.roundRect(margin, margin, contentSize, contentSize, contentSize / 2);
  ctx.fill();

  ctx.font = '12px system-ui';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.fillText(num.toString(), margin + contentSize / 2, margin + contentSize / 2 + 6);
  window.document.body.appendChild(canvas);
  return canvas;
}

export default function DriveExplorerFileItem({ file }: Props) {
  // hooks
  const [{ selects, rename }, setState] = useContext(DriveExplorerContext);
  const [path] = useDriveExplorerPath();
  const driveExplorerFileSelect = useDriveExplorerFileSelect();
  const driveExplorerRename = useDriveFileRename();

  // functions
  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    driveExplorerFileSelect(file.name, e);
  };

  const onLinkClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    if (!file.isDir) {
      e.preventDefault();
      setState({ selects: [file.name], viewer: true, rename: false, renameBulk: false });
    }
  };

  const onRenameInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    driveExplorerRename(file.name, e.currentTarget.value);
  };

  const onRenameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.stopPropagation();
      driveExplorerRename(file.name, e.currentTarget.value);
    }
  };

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('files', JSON.stringify(selects));
    e.dataTransfer.setData('path', path);
    e.dataTransfer.setDragImage(renderDragImage(selects.length), 0, 0);
  };

  // elements
  const isRenameMode = rename && selects[0] === file.name;
  const filePath = join(path, file.name);
  const selected = selects.includes(file.name);

  const nameElement = isRenameMode ? (
    <input defaultValue={file.name} onBlur={onRenameInputBlur} onClick={onLinkClick} onKeyDown={onRenameKeyDown} autoFocus></input>
  ) : (
    <Link to={DriveRoutes.explorer(filePath)} onClick={onLinkClick}>
      {file.name}
    </Link>
  );

  return (
    <div className={cs('DriveExplorerFileItem table_row', { selected })} onClick={onClick} draggable onDragStart={onDragStart}>
      <div className="cell check">
        <i className={selected ? 'fas fa-check-square' : 'far fa-square'} />
      </div>
      <div className="cell icon">
        <DriveFileIcon name={file.name} isDir={file.isDir} />
      </div>
      <div className="cell name">{nameElement}</div>
      <div className="cell size">{file.size}</div>
      <div className="cell date">{file.date}</div>
    </div>
  );
}
