import { throttle } from 'lodash';
import { useContext, useMemo } from 'react';

import { useVideoHistoryUpdator } from '../VideoDetailHooks';
import SimpleVideoPlayer from 'src/components/video/player/SimpleVideoPlayer';
import VideoPlayer, { VideoPlayerProps } from 'src/components/video/player/VideoPlayer';
import { Video } from 'src/model/video';
import { VideoDetailContext } from 'src/pages/video/detail/VideoDetailContext';
import { isIOS } from 'src/utils/user-agent';
import { useOptionalUrlParams } from 'src/hooks/url-params';

interface Props {
  video: Video;
  onEnd?: () => void;
}

export default function VideoDetailPlayer({ video, onEnd }: Props) {
  const [autoplay] = useOptionalUrlParams('autoplay');
  const [{ subtitleSync }] = useContext(VideoDetailContext);
  const { videoUrl, thumbnailUrl, subtitles, time } = video;

  const onTimeUpdate = useVideoHistoryUpdator(video.videoId);
  const onTimeUpdate2 = useMemo(() => throttle(onTimeUpdate, 5000), [onTimeUpdate]);

  const videoPlayerProps: VideoPlayerProps = {
    videoUrl,
    thumbnailUrl,
    subtitles,
    subtitleSync,
    onTimeUpdate: onTimeUpdate2,
    time,
    onEnd,
    autoplay: !!autoplay,
  };

  const videoPlayer = isIOS() ? <SimpleVideoPlayer {...videoPlayerProps} /> : <VideoPlayer {...videoPlayerProps} />;

  return <div className="VideoDetailPlayer">{videoPlayer}</div>;
}
