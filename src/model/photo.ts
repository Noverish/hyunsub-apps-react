import { FileUploadItemStatus, FileWithPath } from 'src/model/file';

export interface AlbumPreview {
  id: string;
  name: string;
  thumbnail: string;
}

export interface Album {
  id: string;
  name: string;
  total: number;
  members: AlbumMember[];
}

export interface AlbumMember {
  userId: string;
  name: string;
}

export interface PhotoPreview {
  id: string;
  thumbnail: string;
  date: string;
  type: PhotoType;
  ext: string;
  userId: string;
}

export type PhotoType = 'VIDEO' | 'PHOTO';

export interface PhotoMetadata {
  photoId: string;
  date: string;
  dateType: string;
  userId: string;
  name: string;
  fileDt: string;
  subSecDateTimeOriginal?: string;
  dateTimeOriginal?: string;
  gpsDateTime?: string;
  timeStamp?: string;
  modifyDate?: string;
  creationDate?: string;
  offsetTime?: string;
  offsetTimeOriginal?: string;
  offsetTimeDigitized?: string;
}

export interface Photo {
  id: string;
  imageSize: string;
  fileSize: string;
  date: string;
  fileName: string;
  regDt: string;
  dateType: string;
  original: string;
}

export type PhotoUploadItemStatus = 'ready' | 'uploading' | FileUploadItemStatus | 'success' | 'error';

export interface PhotoUploadItemInfo {
  file: FileWithPath;
  status: PhotoUploadItemStatus;
  progress: number;
  nonce: string;
  errMsg: string | null;
  preview: PhotoPreview | null;
}
