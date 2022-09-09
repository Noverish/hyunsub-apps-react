export interface Album {
  id: number;
  name: string;
  thumbnail: string;
}

export interface Photo {
  id: number;
  thumbnail: string;
  url: string;
  width: number;
  height: number;
  date: string;
  size: number;
}
