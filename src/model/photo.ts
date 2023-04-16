import { PageData } from "./api";

export interface AlbumPreview {
  id: string;
  name: string;
  thumbnail: string;
}

export interface Album {
  id: string;
  name: string;
  photos: PageData<PhotoPreview>;
}

export interface PhotoPreview {
  id: string;
  thumbnail: string;
  date: string;
  type: PhotoType;
  ext: string;
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
