import cs from 'classnames';
import { extname } from 'path-browserify';

import { DriveFileType } from 'src/model/drive';

import './DriveFileIcon.scss';

interface Props {
  name: string;
  isDir: boolean;
}

export default function DriveFileIcon({ name, isDir }: Props) {
  const type = parseFileType(name, isDir);
  const icon = getIcon(type);

  return <i className={cs('DriveFileIcon', icon, type.toLowerCase())} />;
}

export function parseFileType(name: string, isDir: boolean): DriveFileType {
  if (isDir) {
    return 'FOLDER';
  }

  const ext = extname(name);
  switch (ext.toLowerCase().substring(1)) {
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return 'IMAGE';
    case 'mp4':
    case 'webm':
      return 'VIDEO';
    case 'mp3':
    case 'aac':
      return 'AUDIO';
    case 'pdf':
      return 'PDF';
    case 'txt':
    case 'md':
    case 'srt':
    case 'smi':
    case 'sh':
    case 'yml':
    case 'json':
      return 'TEXT';
    default:
      return 'ETC';
  }
}

function getIcon(type: DriveFileType): string {
  switch (type) {
    case 'FOLDER':
      return 'fas fa-folder';
    case 'IMAGE':
      return 'fas fa-image';
    case 'VIDEO':
      return 'fas fa-video';
    case 'AUDIO':
      return 'fas fa-volume-up';
    case 'TEXT':
      return 'fas fa-file-alt';
    case 'PDF':
      return 'fas fa-file-pdf';
    default:
      return 'fas fa-file';
  }
}