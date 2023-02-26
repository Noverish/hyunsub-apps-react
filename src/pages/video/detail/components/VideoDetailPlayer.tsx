import throttle from 'lodash/throttle';
import { useContext, useMemo } from 'react';
import SimpleVideoPlayer from 'src/components/video/SimpleVideoPlayer';
import VideoPlayer, { VideoPlayerProps } from 'src/components/video/VideoPlayer';
import { Video } from "src/model/video";
import { VideoDetailContext } from 'src/pages/video/detail/VideoDetailState';
import { isIOS } from 'src/utils/user-agent';
import { useVideoHistoryUpdator } from '../VideoDetailHooks';

interface Props {
  video: Video;
}

export default function VideoDetailPlayer({ video }: Props) {
  const [{ subtitleSync }] = useContext(VideoDetailContext);
  const { videoUrl, thumbnailUrl, subtitles, time } = video;

  const onTimeUpdate = useVideoHistoryUpdator(video.videoId);
  const onTimeUpdate3 = useMemo(() => throttle(onTimeUpdate, 5000), [onTimeUpdate]);

  const videoPlayerProps: VideoPlayerProps = {
    videoUrl,
    thumbnailUrl,
    subtitles,
    subtitleSync,
    onTimeUpdate: onTimeUpdate3,
    time,
  }

  const videoPlayer = isIOS()
    ? <SimpleVideoPlayer {...videoPlayerProps} />
    : <VideoPlayer {...videoPlayerProps} />;

  return (
    <div className="VideoDetailPlayer">
      {videoPlayer}
    </div>
  )
}
