export interface DriveFileInfo {
  name: string;
  size: string;
  date: string;
  isDir: boolean;
}

const _DriveFileType = {
  FOLDER: 'FOLDER',
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  AUDIO: 'AUDIO',
  TEXT: 'TEXT',
  PDF: 'PDF',
  ETC: 'ETC',
} as const;

export type DriveFileType = (typeof _DriveFileType)[keyof typeof _DriveFileType];

export interface DrivePathParams {
  path: string;
}

export interface DriveUploadStatus {
  path: string;
  name: string;
  size: number;
  type: string;
  progress: number;
}
