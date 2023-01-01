export interface ComicPreview {
  name: string;
}

export interface ComicDetail {
  episodes: ComicEpisodePreview[];
}

export interface ComicEpisodePreview {
  title: string;
}

export interface ComicEpisodeDetail {
  images: string[];
}
