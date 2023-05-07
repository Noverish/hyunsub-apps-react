export interface Video {
  videoId: string;
  videoUrl: string;
  thumbnailUrl: string;
  title: string;
  subtitles: VideoSubtitle[];
  metadata: VideoMetadata | null;
  time: number;
}

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

export interface VideoEntryDetail {
  category: VideoCategory;
  entry: VideoEntry;
  video: Video;
  seasons: VideoSeason[] | null;
  group: VideoGroupDetail | null;
}

export interface VideoEpisode {
  videoId: string;
  time: number | null;
  thumbnailUrl: string;
  title: string;
  duration: number;
}

export interface VideoGroup {
  id: string;
  name: string;
}

export interface VideoGroupDetail {
  name: string;
  entries: VideoEntry[];
}

export interface VideoMetadata {
  duration: string;
  size: string;
  resolution: string;
  bitrate: string;
}

export interface VideoSeason {
  name: string | null;
  episodes: VideoEpisode[];
}

export interface VideoSubtitle {
  url: string;
  label: string;
  srclang: string;
}

const _VideoSort = {
  random: { name: 'random', value: 'RANDOM', t: 'video.term.sort.random' },
  new: { name: 'new', value: 'NEW', t: 'video.term.sort.new' },
  old: { name: 'old', value: 'OLD', t: 'video.term.sort.old' },
  abc: { name: 'abc', value: 'ABC', t: 'video.term.sort.abc' },
  zyx: { name: 'zyx', value: 'ZYX', t: 'video.term.sort.zyx' },
} as const;

export module VideoSort {
  export const parse = (sort: string | null): VideoSort => {
    const key = (Object.keys(_VideoSort).filter((v) => v === sort)[0] || 'random') as keyof typeof _VideoSort;
    return _VideoSort[key];
  };

  export const values: () => VideoSort[] = () => Object.values(_VideoSort);
}

// eslint-disable-next-line
export type VideoSort = (typeof _VideoSort)[keyof typeof _VideoSort];

export interface VideoHistory {
  videoId: string;
  time: number;
  date: string;
  thumbnailUrl: string;
  duration: number;
  entryId: string;
  title: string;
}
