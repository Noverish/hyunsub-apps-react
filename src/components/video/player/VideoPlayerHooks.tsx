import Plyr, { SourceInfo, Track } from 'plyr';
import { useCallback, useEffect, useState } from 'react';

import { VideoPlayerProps } from 'src/components/video/player/VideoPlayer';
import {
  getCaptionFontSize,
  setCaptionFontSize,
} from 'src/pages/video/detail/components/VideoSettingSection';

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

function destroyPlyr() {
  if (plyr) {
    plyr.destroy();
    plyr = undefined;
  }
}

export function usePlyr(src: string): Plyr | undefined {
  const [plyr, setPlyr] = useState<Plyr | undefined>();

  useEffect(() => {
    if (!plyr) {
      setPlyr(createPlyr(src));
    }
  }, [plyr, src]);

  useEffect(() => destroyPlyr, []);

  return plyr;
}

export function usePlyrTime(plyr: Plyr, time: number, autoplay?: boolean) {
  const setTime = useCallback(() => {
    if (autoplay) {
      plyr.play();
    } else if (time > 0) {
      plyr.currentTime = time;
    }
  }, [plyr, time, autoplay]);

  useEffect(() => {
    plyr.on('loadedmetadata', setTime);

    return () => {
      plyr.off('loadedmetadata', setTime);
    };
  }, [plyr, setTime]);
}

export function usePlyrFontSize(plyr: Plyr) {
  const setFontSize = useCallback(() => {
    const fontSize = getCaptionFontSize();
    setCaptionFontSize(fontSize);
  }, []);

  useEffect(() => {
    plyr.on('loadedmetadata', setFontSize);

    return () => {
      plyr.off('loadedmetadata', setFontSize);
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

export function usePlyrSource(plyr: Plyr, source: SourceInfo) {
  useEffect(() => {
    const src = plyr.source as any;
    const videoUrl = source.sources[0]?.src;
    if (videoUrl !== src) {
      plyr.source = source;
    }
  }, [plyr, source]);
}

export function usePlyrKeyDown(plyr: Plyr) {
  useEffect(() => {
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

export function usePlyrTimeUpdate(plyr: Plyr, time: number, onTimeUpdate: (time: number) => void) {
  const timeUpdate = useCallback(() => {
    const now = plyr.currentTime;
    if (now !== 0 && now !== time) {
      onTimeUpdate(now);
    }
  }, [plyr, onTimeUpdate, time]);

  useEffect(() => {
    plyr.on('timeupdate', timeUpdate);

    return () => {
      plyr.off('timeupdate', timeUpdate);
    };
  }, [plyr, timeUpdate]);
}

export function usePlyrEndCallback(plyr: Plyr, callback?: () => void) {
  useEffect(() => {
    if (callback) {
      plyr.on('ended', callback);
    }

    return () => {
      if (callback) {
        plyr.off('ended', callback);
      }
    };
  }, [plyr, callback]);
}
