export interface VideoCategory {
  name: string;
  displayName: string;
  iconHtmlClass: string;
  listHtmlClass: string;
  itemCss: string;
}

export interface VideoEntry {
  id: string;
  name: string;
  thumbnail: string;
}

export type VideoEpisodeList = {[season: string]: VideoEpisode[]};

export interface VideoEntryDetail {
  category: string;
  video: Video;
  episodes?: VideoEpisodeList;
  group?: VideoGroup;
}

export interface VideoSubtitle {
  url: string;
  label: string;
  srclang: string;
}

export interface VideoMetadata {
  duration: string;
  size: string;
  resolution: string;
  bitrate: string;
}

export interface Video {
  videoId: string;
  videoUrl: string;
  thumbnailUrl: string;
  title: string;
  subtitles: VideoSubtitle[];
  metadata?: VideoMetadata;
}

export interface VideoEpisode {
  videoId: string;
  thumbnailUrl: string;
  title: string;
}

export interface VideoGroup {
  name: string;
  entries: VideoEntry[];
}

export interface VideoGroupPreview {
  id: string;
  name: string;
}

export const VideoSort = {
  random: 'random',
  new: 'new',
  old: 'old',
  abc: 'abc',
  zyx: 'zyx',
} as const;

export type VideoSort = typeof VideoSort[keyof typeof VideoSort];
