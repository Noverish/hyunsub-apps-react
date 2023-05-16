import { Link } from 'react-router-dom';

import VideoRoutes from '../VideoRoutes';
import videoEntryDetailApi from 'src/api/video/video-entry-detail';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import { useUrlParams } from 'src/hooks/url-params';
import { VideoEpisode, VideoSeason } from 'src/model/video';
import VideoEntryRenameForm from 'src/pages/video/manage/components/VideoEntryRenameForm';
import VideoEntryScanCard from 'src/pages/video/manage/components/VideoEntryScanCard';
import { setDocumentTitle } from 'src/utils/services';

import './VideoEntryManagePage.scss';

export default function VideoEntryManagePage() {
  const [entryId] = useUrlParams('entryId');

  setDocumentTitle(`Entry 관리 - ${entryId}`);

  const { entry, seasons } = videoEntryDetailApi.useApi({ entryId });

  const videoIds = seasons?.flatMap((v) => v.episodes)?.map((v) => v.videoId);

  return (
    <div className="VideoEntryManagePage">
      <MobileHeader title={entry.name} back />
      <CommonContainer>
        <h1>{entry.name}</h1>
        <hr />
        {videoIds && <VideoEntryRenameForm videoIds={videoIds} entryId={entryId} />}
        <hr />
        <VideoEntryScanCard />
        {seasons?.map((v) => renderEntryManageSeason(entryId, v))}
      </CommonContainer>
    </div>
  );
}

function renderEntryManageSeason(entryId: string, season: VideoSeason) {
  return (
    <div key={season.name} className="mt-4">
      <h3>{season.name}</h3>
      <div>{season.episodes.map((v) => renderEntryManagerRow(entryId, v))}</div>
    </div>
  );
}

function renderEntryManagerRow(entryId: string, episode: VideoEpisode) {
  return (
    <Link to={VideoRoutes.detail(entryId, episode.videoId)} key={episode.videoId} className="episode hyunsub_border gray_bg_hover">
      {episode.title}
    </Link>
  );
}
