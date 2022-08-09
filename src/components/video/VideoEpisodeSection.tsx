import cs from 'classnames';
import { useState } from "react";
import { Dropdown, Pagination } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { VideoEpisode, VideoEpisodeList } from "src/model/video";
import { loadOtherEpisode } from "src/pages/video/detail/VideoDetailContext";
import VideoRoutes from 'src/pages/video/VideoRoutes';
import { useDispatch } from "src/redux";
import AppConstant from 'src/utils/constants';

import './VideoEpisodeSection.scss';

const PAGE_SIZE = AppConstant.video.EPISODE_PAGE_SIZE;

interface Props {
  videoId: string;
  episodes: VideoEpisodeList;
}

function validateVideoId(episodes: VideoEpisodeList, videoId: string): [string, number] {
  for (const [season, videos] of Object.entries(episodes)) {
    for (let i = 0; i < videos.length; i++) {
      const video = videos[i];
      if (video.videoId === videoId) {
        const page = Math.floor(i / PAGE_SIZE);
        return [season, page];
      }
    }
  }
  throw new Error('Never Happened!');
}

export default function VideoEpisodeSection({ episodes, videoId }: Props) {
  const [initSeason, initPage] = validateVideoId(episodes, videoId);

  const [season, setSeason] = useState(initSeason);
  const [page, setPage] = useState(initPage);

  const videos = episodes[season]
  const total = videos.length;

  const sliced = videos.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const episodeElements = sliced.map(v => (
    <VideoEpisodeItem key={v.videoId} episode={v} active={v.videoId === videoId} />
  ))

  const totalPagination = Math.ceil(total / PAGE_SIZE);

  const seasons = Object.keys(episodes)
  const hasSeason = seasons.length > 1;

  return (
    <section id="VideoEpisodeList">
      <hr />
      <div className="d-flex align-items-center mb-3">
        <h3 className="d-inline-block me-3 mb-0">전체회차 {total}화</h3>
        {hasSeason && <VideoSeasonDropdown nowSeason={season} seasons={seasons} setSeason={setSeason} />}
      </div>
      <div className="row g-3">
        {episodeElements}
      </div>
      <div className="mt-3">
        <VideoEpisodePagination curr={page} total={totalPagination} setPage={setPage} />
      </div>
    </section >
  )
}

interface VideoSeasonDropdownProps {
  nowSeason: string;
  seasons: string[];
  setSeason: (season: string) => void;
}

function VideoSeasonDropdown({ nowSeason, seasons, setSeason }: VideoSeasonDropdownProps) {
  const items = seasons.sort().map(v => (
    <Dropdown.Item key={v} active={v === nowSeason} as='button' eventKey={v}>{v}</Dropdown.Item>
  ))

  const onSelect = (key: string | null) => {
    if (key !== null) {
      setSeason(key)
    }
  };

  return (
    <Dropdown onSelect={onSelect}>
      <Dropdown.Toggle variant="secondary">{nowSeason}</Dropdown.Toggle>
      <Dropdown.Menu>
        {items}
      </Dropdown.Menu>
    </Dropdown>
  )
}

interface VideoEpisodeItemProps {
  episode: VideoEpisode;
  active: boolean;
}

function VideoEpisodeItem({ episode, active }: VideoEpisodeItemProps) {
  const dispatch = useDispatch();
  const entryId = useParams().entryId!!;

  const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(loadOtherEpisode({
      videoId: episode.videoId,
      entryId,
    }))
  }

  const href = VideoRoutes.getDetailRoute(entryId, episode.videoId);
  const className = cs('episode_item col-6 d-flex', { active });

  return (
    <a className={className} href={href} onClick={onClick}>
      <div className="episode_thumbnail ratio ratio-16x9">
        <img className="img-fluid rounded-1" src={episode.thumbnailUrl} loading="lazy" alt={episode.title} />
      </div>
      <div className="episode_title">{episode.title}</div>
    </a>
  )
}

interface VideoEpisodePaginationProps {
  curr: number;
  total: number;
  setPage: (page: number) => void;
}

function VideoEpisodePagination({ curr, total, setPage }: VideoEpisodePaginationProps) {
  const pageItems = Array.from({ length: total }, (_, i) => (
    <Pagination.Item key={i} active={i === curr} onClick={() => setPage(i)}>
      {i + 1}
    </Pagination.Item>
  ))

  return (
    <Pagination className="justify-content-center">
      {pageItems}
    </Pagination>
  )
}

