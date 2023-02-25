import cs from 'classnames';
import { useParams } from 'react-router-dom';
import { VideoEpisode } from 'src/model/video';
import { loadOtherEpisode } from 'src/pages/video/detail/VideoDetailContext';
import VideoRoutes from 'src/pages/video/VideoRoutes';
import { useDispatch } from 'src/redux';

interface Props {
  episode: VideoEpisode;
  active: boolean;
}

export default function VideoEpisodeItem({ episode, active }: Props) {
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
      <div className="episode_thumbnail ratio ratio-16x9">
        <img className="img-fluid rounded-1" src={episode.thumbnailUrl} loading="lazy" alt={episode.title} />
        <div className="episode_thumbnail_play_icon flex_center">
          <i className="fas fa-play" />
        </div>
      </div>
      <div className="episode_title">{episode.title}</div>
    </a>
  )
}
