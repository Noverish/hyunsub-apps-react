import Plyr, { SourceInfo, Track } from 'plyr';
import { useCallback, useEffect, useState } from 'react';

import { VideoPlayerProps } from 'src/components/video/player/VideoPlayer';
import { getCaptionFontSize, setCaptionFontSize } from 'src/pages/video/detail/components/VideoSettingSection';

let plyr: Plyr | undefined;

function createPlyr(src: string): Plyr {
  if (plyr) {
    return plyr;
  }

  const tmp = new Plyr('#VideoPlayer', {
    keyboard: { global: true },
    captions: { active: true, language: 'ko' },
    ratio: '16:9',
    blankVideo: src,
  });
  plyr = tmp;

  return tmp;
}

export function usePlyr(src: string): Plyr | undefined {
  const [plyr, setPlyr] = useState<Plyr | undefined>();

  useEffect(() => {
    if (!plyr) {
      setPlyr(createPlyr(src));
    }
  }, [plyr, src]);

  return plyr;
}

export function usePlyrTime(plyr: Plyr | undefined, time: number) {
  const setTime = useCallback(() => {
    if (plyr && time > 0) {
      plyr.currentTime = time;
    }
  }, [plyr, time]);

  useEffect(() => {
    plyr?.on('loadedmetadata', setTime);

    return () => {
      plyr?.off('loadedmetadata', setTime);
    };
  }, [plyr, setTime]);
}

export function usePlyrFontSize(plyr: Plyr | undefined) {
  const setFontSize = useCallback(() => {
    const fontSize = getCaptionFontSize();
    setCaptionFontSize(fontSize);
  }, []);

  useEffect(() => {
    plyr?.on('loadedmetadata', setFontSize);

    return () => {
      plyr?.off('loadedmetadata', setFontSize);
    };
  }, [plyr, setFontSize]);
}

export function convertPlyrSource(props: VideoPlayerProps): SourceInfo {
  const { thumbnailUrl, videoUrl, subtitles, subtitleSync } = props;

  const tracks: Track[] = subtitles.map((v) => {
    const sync = subtitleSync[v.url];
    const params = sync !== undefined ? `?sync=${sync}` : '';

    return {
      kind: 'captions',
      label: v.label,
      srcLang: v.srclang,
      src: v.url + params,
      default: v.srclang === 'ko',
    };
  });

  const source: SourceInfo = {
    type: 'video',
    poster: thumbnailUrl,
    tracks,
    sources: [
      {
        src: videoUrl,
        type: 'video/mp4',
      },
    ],
  };

  return source;
}

export function usePlyrSource(plyr: Plyr | undefined, source: SourceInfo) {
  useEffect(() => {
    if (!plyr) return;

    const src = plyr.source as any;
    const videoUrl = source.sources[0]?.src;
    if (videoUrl !== src) {
      plyr.source = source;
    }
  }, [plyr, source]);
}

export function usePlyrKeyDown(plyr: Plyr | undefined) {
  useEffect(() => {
    if (!plyr) return;

    window.onkeydown = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.stopPropagation();
        e.preventDefault();
        if (plyr.playing) {
          plyr.pause();
        } else {
          plyr.play();
        }
      }

      if (e.key === 'Enter') {
        e.stopPropagation();
        e.preventDefault();
        plyr.fullscreen.toggle();
      }
    };

    return () => {
      window.onkeydown = null;
    };
  }, [plyr]);
}

export function usePlyrTimeUpdate(plyr: Plyr | undefined, time: number, onTimeUpdate: (time: number) => void) {
  const timeUpdate = useCallback(() => {
    if (!plyr) return;

    const now = plyr.currentTime;
    if (now !== 0 && now !== time) {
      onTimeUpdate(now);
    }
  }, [plyr, onTimeUpdate, time]);

  useEffect(() => {
    plyr?.on('timeupdate', timeUpdate);

    return () => {
      plyr?.off('timeupdate', timeUpdate);
    };
  }, [plyr, timeUpdate]);
}
