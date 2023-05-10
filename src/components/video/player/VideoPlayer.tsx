import { useEffect } from 'react';

import { usePlyr, usePlyrFontSize, usePlyrSource, usePlyrTime } from './VideoPlayerHooks';
import { convertPlyrSource, usePlyrKeyDown, usePlyrTimeUpdate } from 'src/components/video/player/VideoPlayerHooks';
import { VideoSubtitle } from 'src/model/video';

import 'plyr/dist/plyr.css';

export interface VideoPlayerProps {
  thumbnailUrl: string;
  videoUrl: string;
  subtitles: VideoSubtitle[];
  subtitleSync: { [subtitleUrl: string]: number };
  time: number;
  onTimeUpdate: (time: number) => void;
}

export default function VideoPlayer(props: VideoPlayerProps) {
  const source = convertPlyrSource(props);
  const plyr = usePlyr(props.videoUrl);

  usePlyrSource(plyr, source);
  usePlyrTime(plyr, props.time);
  usePlyrFontSize(plyr);
  usePlyrKeyDown(plyr);
  usePlyrTimeUpdate(plyr, props.time, props.onTimeUpdate);

  useEffect(() => {
    const videoElement: HTMLVideoElement | null = document.querySelector('video');
    if (videoElement) {
      videoElement.setAttribute('crossorigin', 'use-credentials');
    }
  });

  return <video id="VideoPlayer" controls />;
}
