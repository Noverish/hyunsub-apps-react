import { Link, useParams } from 'react-router-dom';
import videoEntryDetailApi from 'src/api/video/video-entry-detail';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import { VideoEpisode, VideoSeason } from 'src/model/video';
import VideoEntryRenameForm from 'src/pages/video/manage/components/VideoEntryRenameForm';
import { setDocumentTitle } from 'src/utils/services';
import VideoRoutes from '../VideoRoutes';

import './VideoEntryManagePage.scss';

export default function VideoEntryManagePage() {
  const entryId = useParams().entryId || '';

  setDocumentTitle(`Entry 관리 - ${entryId}`);

  const data = videoEntryDetailApi.useApi({ entryId });
  const { entry, seasons } = data;
  const videoIds = seasons?.flatMap(v => v.episodes)?.map(v => v.videoId);

  return (
    <div className="VideoEntryManagePage">
      <MobileHeader title={entry.name} back />
      <CommonContainer>
        <h1>{entry.name}</h1>
        <hr />
        {videoIds && <VideoEntryRenameForm videoIds={videoIds} entryId={entryId} />}
        {seasons?.map(v => renderEntryManageSeason(entryId, v))}
      </CommonContainer>
    </div>
  )
}

function renderEntryManageSeason(entryId: string, season: VideoSeason) {
  return (
    <div key={season.name}>
      <h3>{season.name}</h3>
      <div>
        {season.episodes.map(v => renderEntryManagerRow(entryId, v))}
      </div>
    </div>
  )
}

function renderEntryManagerRow(entryId: string, episode: VideoEpisode) {
  return (
    <Link to={VideoRoutes.detailRoute(entryId, episode.videoId)} key={episode.videoId} className="episode hyunsub_border gray_bg_hover">
      {episode.title}
    </Link>
  )
}
