import { VideoSubtitle } from "src/model/video";
import Plyr from 'plyr';
import { isIOS } from "src/utils/user-agent";
import { useEffect, useRef } from "react";

import 'plyr/dist/plyr.css';

interface Props {
  thumbnailUrl: string;
  videoUrl: string;
  subtitles: VideoSubtitle[];
}

export default function VideoPlayer(props: Props) {
  const playerRef = useRef<Plyr>();

  useEffect(() => {
    if (!isIOS()) {
      const player = new Plyr('#player', {
        keyboard: { global: true },
        captions: { active: true, language: 'ko' },
        ratio: '16:9',
        clickToPlay: true,
      });
      // player.language = 'ko';
      // playerRef.current = player;
    }
  });

  const tracks = props.subtitles.map(v => (
    <track key={v.label} kind="captions" label={v.label} srcLang={v.srclang} src={v.url} />
  ));

  return (
    <video id="player" playsInline controls crossOrigin="use-credentials" poster={props.thumbnailUrl}>
      <source src={props.videoUrl} type="video/mp4" />
      {tracks}
    </video>
  )
}
