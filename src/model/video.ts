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

export enum VideoSort {
  random = 'random',
  new = 'new',
  old = 'old',
  abc = 'abc',
  zyx = 'zyx',
}
