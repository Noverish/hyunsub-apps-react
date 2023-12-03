import { FileUploadItemStatus, FileWithPath } from 'src/model/file';

export interface DriveFileInfo {
  name: string;
  size: number;
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

export type DriveUploadItemStatus = 'ready' | 'uploading' | FileUploadItemStatus;

export interface DriveUploadItemInfo {
  file: FileWithPath;
  status: DriveUploadItemStatus;
  progress: number;
  root: string;
}

export interface DriveFileSort {
  readonly name: string;
  readonly isAsc: boolean;
}

export const DriveFileSorts = {
  NAME_ASC: { name: 'NAME_ASC', isAsc: true } as const,
  SIZE_ASC: { name: 'SIZE_ASC', isAsc: true } as const,
  DATE_ASC: { name: 'DATE_ASC', isAsc: true } as const,
  NAME_DESC: { name: 'NAME_DESC', isAsc: false } as const,
  SIZE_DESC: { name: 'SIZE_DESC', isAsc: false } as const,
  DATE_DESC: { name: 'DATE_DESC', isAsc: false } as const,
};

export interface YoutubeMetadata {
  resolutions: string[];
  subtitles: YoutubeMetadataSubtitle[];
}

export interface YoutubeMetadataSubtitle {
  lang: string;
  label: string;
}
