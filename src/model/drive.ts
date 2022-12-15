export interface DriveFileInfo {
  name: string;
  size: string;
  date: string;
  type: DriveFileType;
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

export type DriveFileType = typeof _DriveFileType[keyof typeof _DriveFileType];

export interface DrivePathParams {
  path: string;
}

export interface DriveUploadingFile {
  path: string;
  progress: number;
}
