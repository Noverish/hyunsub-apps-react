export interface VideoCategory {
  name: string;
  displayName: string;
  htmlClass: string;
}

export interface VideoEntry {
  id: string;
  name: string;
  thumbnail: string;
}

export interface VideoDetail {
  videoUrl: string;
  thumbnailUrl: string;
  title: string;
  subtitles: VideoSubtitle[];
}

export interface VideoSubtitle {
  url: string;
  label: string;
  srclang: string;
}

export enum VideoSort {
  random = 'random',
  new = 'new',
  old = 'old',
  abc = 'abc',
  zyx = 'zyx',
}
