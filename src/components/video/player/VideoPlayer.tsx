import { useEffect } from 'react';

import {
  convertPlyrSource,
  usePlyr,
  usePlyrEndCallback,
  usePlyrFontSize,
  usePlyrKeyDown,
  usePlyrSource,
  usePlyrTime,
  usePlyrTimeUpdate,
} from './VideoPlayerHooks';
import { VideoSubtitle } from 'src/model/video';

import './VideoPlayer.scss';
import 'plyr/dist/plyr.css';

export interface VideoPlayerProps {
  thumbnailUrl: string;
  videoUrl: string;
  subtitles: VideoSubtitle[];
  subtitleSync: { [subtitleUrl: string]: number };
  time: number;
  onTimeUpdate: (time: number) => void;
  onEnd?: () => void;
  autoplay?: boolean;
}

export default function VideoPlayer(props: VideoPlayerProps) {
  const plyr = usePlyr(props.videoUrl);

  return (
    <>
      <video id="VideoPlayer" controls />
      {plyr && <VideoPlayerControl props={props} plyr={plyr} />}
    </>
  );
}

function VideoPlayerControl({ props, plyr }: { props: VideoPlayerProps; plyr: Plyr }) {
  const source = convertPlyrSource(props);

  usePlyrSource(plyr, source);
  usePlyrTime(plyr, props.time, props.autoplay);
  usePlyrFontSize(plyr);
  usePlyrKeyDown(plyr);
  usePlyrTimeUpdate(plyr, props.time, props.onTimeUpdate);
  usePlyrEndCallback(plyr, props.onEnd);

  useEffect(() => {
    const videoElement: HTMLVideoElement | null = document.querySelector('video');
    if (videoElement) {
      videoElement.setAttribute('crossorigin', 'use-credentials');
    }
  });

  return <></>;
}
