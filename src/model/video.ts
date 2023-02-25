export interface Video {
  videoId: string;
  videoUrl: string;
  thumbnailUrl: string;
  title: string;
  subtitles: VideoSubtitle[];
  metadata: VideoMetadata | null;
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
  thumbnailUrl: string;
  title: string;
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
  random: { name: 'random', t: 'video.term.sort.random' },
  new: { name: 'new', t: 'video.term.sort.new' },
  old: { name: 'old', t: 'video.term.sort.old' },
  abc: { name: 'abc', t: 'video.term.sort.abc' },
  zyx: { name: 'zyx', t: 'video.term.sort.zyx' },
} as const;

export module VideoSort {
  export const parse = (sort: string | null): VideoSort => {
    const key = (Object.keys(_VideoSort).filter(v => v === sort)[0] || 'random') as keyof typeof _VideoSort;
    return _VideoSort[key];
  }

  export const values: () => VideoSort[] = () => Object.values(_VideoSort);
}

// eslint-disable-next-line
export type VideoSort = typeof _VideoSort[keyof typeof _VideoSort];
