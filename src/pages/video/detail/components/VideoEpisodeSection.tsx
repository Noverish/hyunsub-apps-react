import { t } from 'i18next';
import CommonPagination from 'src/components/common/CommonPagination';
import { VideoSeason } from "src/model/video";
import { useSeasonAndPage } from '../VideoDetailHooks';
import VideoEpisodeItem from './VideoEpisodeItem';
import VideoSeasonDropdown from './VideoSeasonDropdown';

import './VideoEpisodeSection.scss';

interface Props {
  videoId: string;
  seasons: VideoSeason[];
}

export default function VideoEpisodeSection({ seasons, videoId }: Props) {
  const { episodes, total, totalPage, page, setPage } = useSeasonAndPage(seasons, videoId);

  const episodeElements = episodes.map(v => (
    <VideoEpisodeItem key={v.videoId} episode={v} active={v.videoId === videoId} />
  ));

  return (
    <section className="VideoEpisodeSection">
      <hr className="my-2 my-md-3" />
      <div className="header">
        <VideoSeasonDropdown />
        <span className="total">{t('video.episode-section.title', [total])}</span>
      </div>
      <div className="row g-2 g-md-3">
        {episodeElements}
      </div>
      <div className="mt-3 d-flex flex_center">
        <CommonPagination now={page} total={totalPage} onClick={setPage} />
      </div>
    </section >
  )
}
