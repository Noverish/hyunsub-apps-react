import { useCallback, useEffect, useRef } from 'react';

import { VideoPlayerProps } from './VideoPlayer';

export default function SimpleVideoPlayer(props: VideoPlayerProps) {
  const { thumbnailUrl, videoUrl, subtitles, time, onTimeUpdate } = props;
  const ref = useRef<HTMLVideoElement>(null);

  const onTimeUpdate2 = useCallback(() => {
    onTimeUpdate(ref.current!.currentTime);
  }, [onTimeUpdate]);

  useEffect(() => {
    ref.current?.load();
  }, [videoUrl]);

  useEffect(() => {
    ref.current!.currentTime = time;
  }, [time]);

  useEffect(() => {
    const video = ref.current!;
    video.addEventListener('timeupdate', onTimeUpdate2);
    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate2);
    };
  }, [onTimeUpdate2]);

  const tracks = subtitles.map((v) => <track key={v.url} kind="captions" label={v.label} srcLang={v.srclang} src={v.url} />);

  return (
    <div className="ratio ratio-16x9">
      <video ref={ref} id="player" playsInline controls crossOrigin="use-credentials" poster={thumbnailUrl}>
        <source src={videoUrl} type="video/mp4" />
        {tracks}
      </video>
    </div>
  );
}
