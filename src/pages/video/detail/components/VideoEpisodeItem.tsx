import cs from 'classnames';
import { useParams } from 'react-router-dom';
import VideoThumbnail from 'src/components/video/VideoThumbnail';
import { VideoEpisode } from 'src/model/video';
import { loadOtherEpisode } from 'src/pages/video/detail/VideoDetailContext';
import VideoRoutes from 'src/pages/video/VideoRoutes';
import { useDispatch } from 'src/redux';

interface Props {
  episode: VideoEpisode;
  active: boolean;
}

export default function VideoEpisodeItem({ episode, active }: Props) {
  const { thumbnailUrl, time, duration } = episode;
  const dispatch = useDispatch();
  const entryId = useParams().entryId!!;

  const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(loadOtherEpisode({
      videoId: episode.videoId,
      entryId,
    }))
  }

  const href = VideoRoutes.detailRoute(entryId, episode.videoId);
  const className = cs('episode_item col-6 d-flex', { active });

  return (
    <a className={className} href={href} onClick={onClick}>
      <VideoThumbnail
        className="episode_thumbnail ratio-16x9"
        src={thumbnailUrl}
        time={time}
        duration={duration}
        alt={episode.title}
        active={active}
      />
      <div className="episode_title">{episode.title}</div>
    </a>
  )
}
