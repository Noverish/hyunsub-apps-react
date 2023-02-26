import { Options, SourceInfo, Track } from "plyr";
import Plyr, { APITypes } from "plyr-react";
import { memo, useEffect, useRef } from "react";
import { VideoSubtitle } from "src/model/video";
import { getCaptionFontSize, setCaptionFontSize } from "src/pages/video/detail/components/VideoSettingSection";

import "plyr-react/plyr.css";

declare global {
  interface Window {
    player?: Plyr;
  }
}

export interface VideoPlayerProps {
  thumbnailUrl: string;
  videoUrl: string;
  subtitles: VideoSubtitle[];
  subtitleSync: { [subtitleUrl: string]: number };
  time: number;
  onTimeUpdate: (time: number) => void;
}

export function VideoPlayer(props: VideoPlayerProps) {
  const { thumbnailUrl, videoUrl, subtitles, subtitleSync, time, onTimeUpdate } = props;
  const ref = useRef<APITypes>(null);

  useEffect(() => {
    setTimeout(() => {
      const plyr = ref.current?.plyr;
      if (plyr) {
        window.player = plyr;
        plyr.on('play', () => {
          const fontSize = getCaptionFontSize();
          setCaptionFontSize(fontSize);
        });
        plyr.on('loadedmetadata', () => {
          plyr.currentTime = time;
        })
        plyr.on('timeupdate', () => {
          onTimeUpdate(plyr.currentTime);
        });
      }
    }, 10);
  }, [videoUrl, time, onTimeUpdate]);

  useEffect(() => {
    const videoElement: HTMLVideoElement | null = document.querySelector('video');
    if (videoElement) {
      videoElement.setAttribute('crossorigin', 'use-credentials');
    }
  });

  const options: Options = {
    keyboard: { global: true },
    captions: { active: true, language: 'ko' },
    ratio: '16:9',
  }

  const tracks: Track[] = subtitles.map(v => {
    const sync = subtitleSync[v.url];
    const params = (sync !== undefined) ? `?sync=${sync}` : '';

    return {
      kind: 'captions',
      label: v.label,
      srcLang: v.srclang,
      src: v.url + params,
      default: v.srclang === 'ko'
    }
  })

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
    <Plyr ref={ref} source={source} options={options} />
  )
}

export default memo(VideoPlayer);
