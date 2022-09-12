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

export interface PhotoExifDate {
  photoId: number;
  name: string;
  date: string;
  nameDate: string;
  dateTimeCreated: string;
  subSecCreateDate: string;
  fileModifyDate: string;
  modifyDate: string;
  createDate: string;
  creationDate: string;
  dateTimeOriginal: string;
  timeStamp: string;
  gpsDateTime: string;
}
