import { VideoSubtitle } from "src/model/video";
import Plyr, { Track } from 'plyr';
import { isIOS } from "src/utils/user-agent";
import { useEffect, useRef } from "react";

import 'plyr/dist/plyr.css';

interface Props {
  thumbnailUrl: string;
  videoUrl: string;
  subtitles: VideoSubtitle[];
}

export default function VideoPlayer(props: Props) {
  const { thumbnailUrl, videoUrl, subtitles } = props;
  const playerRef = useRef<Plyr>();

  useEffect(() => {
    if (!isIOS()) {
      const player = new Plyr('#player', {
        keyboard: { global: true },
        captions: { active: true, language: 'ko' },
        ratio: '16:9',
      });
      // player.language = 'ko';
      playerRef.current = player;
    }
  }, []);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) {
      return;
    }

    const tracks: Track[] = subtitles.map(v => ({
      kind: 'captions',
      label: v.label,
      srcLang: v.srclang,
      src: v.url,
      default: v.srclang === 'ko'
    }))

    player.source = {
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
    
    const v = document.getElementsByTagName('video')[0];
    v.setAttribute('crossorigin', 'use-credentials');
  }, [thumbnailUrl, videoUrl, subtitles]);

  const tracks = props.subtitles.map(v => (
    <track key={v.label} kind="captions" label={v.label} srcLang={v.srclang} src={v.url} />
  ));

  return (
    <video id="player" playsInline controls crossOrigin="use-credentials" data-poster={props.thumbnailUrl}>
      <source src={props.videoUrl} type="video/mp4" />
      {tracks}
    </video>
  )
}
