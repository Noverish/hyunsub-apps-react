import { useEffect, useRef } from 'react';
import { VideoPlayerProps } from './VideoPlayer';

export default function SimpleVideoPlayer({ thumbnailUrl, videoUrl, subtitles }: VideoPlayerProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    ref.current?.load();
  }, [videoUrl])

  const tracks = subtitles.map((v) => (
    <track key={v.url} kind="captions" label={v.label} srcLang={v.srclang} src={v.url} />
  ));

  return (
    <div className="ratio ratio-16x9">
      <video ref={ref} id="player" playsInline controls crossOrigin="use-credentials" poster={thumbnailUrl}>
        <source src={videoUrl} type="video/mp4" />
        {tracks}
      </video>
    </div>
  )
}
