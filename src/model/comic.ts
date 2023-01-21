export interface ComicPreview {
  id: string;
  title: string;
}

export interface ComicDetail {
  id: string;
  title: string;
  episodes: ComicEpisodePreview[];
}

export interface ComicEpisodePreview {
  order: number;
  title: string;
  length: number;
  regDt: string;
}

export interface ComicEpisodeDetail {
  comicId: string;
  order: number;
  title: string;
  length: number;
  regDt: string;
  images: string[];
}
