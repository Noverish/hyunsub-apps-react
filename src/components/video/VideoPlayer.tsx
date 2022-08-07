import { Options, SourceInfo, Track } from "plyr";
import Plyr from "plyr-react";
import { VideoSubtitle } from "src/model/video";

import "plyr-react/plyr.css";
import { memo } from "react";

interface Props {
  thumbnailUrl: string;
  videoUrl: string;
  subtitles: VideoSubtitle[];
}

export function VideoPlayer({ thumbnailUrl, videoUrl, subtitles }: Props) {
  const options: Options = {
    keyboard: { global: true },
    captions: { active: true, language: 'ko' },
    ratio: '16:9',
  }

  const tracks: Track[] = subtitles.map(v => ({
    kind: 'captions',
    label: v.label,
    srcLang: v.srclang,
    src: v.url,
    default: v.srclang === 'ko'
  }))

  const source: SourceInfo = {
    type: 'video',
    poster: thumbnailUrl,
    tracks,
    sources: [
      {
        src: videoUrl,
        type: 'video/mp4',
      }
    ],
  };

  return (
    <Plyr source={source} options={options} />
  )
}

export default memo(VideoPlayer);
