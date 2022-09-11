export interface AlbumPreview {
  id: number;
  name: string;
  thumbnail: string;
}

export interface Album {
  total: number;
  preview: AlbumPreview;
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
