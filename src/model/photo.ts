export interface AlbumPreview {
  id: number;
  name: string;
  thumbnail: string;
}

export interface Album {
  id: number;
  name: string;
  thumbnail: string;
  photos: number;
}

export interface Photo {
  id: number;
  thumbnail: string;
  url: string;
  width: number;
  height: number;
  date: string;
  size: string;
  liveVideo: string | null;
}

export interface PhotoDate {
  photoId: number;
  name: string;
  date: string;
  nameDate: string | null;
  dateTimeCreated: string | null;
  subSecCreateDate: string | null;
  fileModifyDate: string | null;
  modifyDate: string | null;
  createDate: string | null;
  creationDate: string | null;
  dateTimeOriginal: string | null;
  timeStamp: string | null;
  gpsDateTime: string | null;
}

export interface PhotoPreview {
  id: string;
  thumbnail: string;
  date: string;
  type: PhotoType;
  ext: string;
}

export type PhotoType = 'VIDEO' | 'PHOTO';
