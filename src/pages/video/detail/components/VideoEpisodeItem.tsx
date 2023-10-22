import cs from 'classnames';
import { Link, useParams } from 'react-router-dom';

import VideoThumbnail from 'src/components/video/VideoThumbnail';
import { VideoEpisode } from 'src/model/video';
import VideoRoutes from 'src/pages/video/VideoRoutes';

import './VideoEpisodeItem.scss';

interface Props {
  episode: VideoEpisode;
  active: boolean;
}

export default function VideoEpisodeItem({ episode, active }: Props) {
  const { thumbnailUrl, time, duration } = episode;
  const entryId = useParams().entryId!!;

  const href = VideoRoutes.detail({ entryId, videoId: episode.videoId });
  const className = cs('VideoEpisodeItem episode_item col-6 d-flex', { active });
  const episodeTitleInfo = processEpisodeTitle(episode.title);

  const episodeTitleElement = episodeTitleInfo ? (
    <div className="title_info">
      <div className="episode">{episodeTitleInfo.episode}</div>
      <div className="title">{episodeTitleInfo.title}</div>
      {episodeTitleInfo.date && <div className="date">{episodeTitleInfo.date}</div>}
    </div>
  ) : (
    <div className="title">{episode.title}</div>
  );

  return (
    <Link className={className} to={href}>
      <VideoThumbnail
        className="episode_thumbnail ratio-16x9"
        src={thumbnailUrl}
        time={time}
        duration={duration}
        alt={episode.title}
        active={active}
      />
      {episodeTitleElement}
    </Link>
  );
}

function processEpisodeTitle(str: string): EpisodeTitleInfo | undefined {
  const result = str.match(/^(.+)\.(S\d+)?E(\d+)(\.\d{6})?(\..*)?$/);
  if (!result) {
    return undefined;
  }

  const episode = parseInt(result[3]);

  const dateStr = result[4] ? result[4].slice(1) : undefined;
  const date = dateStr ? `20${dateStr.slice(0, 2)}-${dateStr.slice(2, 4)}-${dateStr.slice(4, 6)}` : undefined;

  const title = result[5] ? result[5].slice(1) : result[1];

  return { episode, date, title };
}

interface EpisodeTitleInfo {
  episode: number;
  date?: string;
  title: string;
}
