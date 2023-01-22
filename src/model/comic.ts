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
  history?: number;
}

export interface ComicEpisodeDetail {
  comicId: string;
  order: number;
  title: string;
  episodeTitle: string;
  length: number;
  regDt: string;
  images: string[];
  history?: number;
  hasNextEpisode: boolean;
}
