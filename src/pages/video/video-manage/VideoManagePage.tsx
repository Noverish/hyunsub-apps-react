import { Link } from 'react-router-dom';

import VideoRoutes from '../VideoRoutes';
import videoDetailApi from 'src/api/video/video-detail';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import { useUrlParams } from 'src/hooks/url-params';
import VideoEncodeCard from 'src/pages/video/video-manage/components/VideoEncodeCard';
import VideoMetadataScanCard from 'src/pages/video/video-manage/components/VideoMetadataScanCard';
import VideoSubtitleUploadCard from 'src/pages/video/video-manage/components/VideoSubtitleUploadCard';
import VideoThumbnailGenerateCard from 'src/pages/video/video-manage/components/VideoThumbnailGenerateCard';
import { setDocumentTitle } from 'src/utils/services';

import './VideoManagePage.scss';

export default function VideoManagePage() {
  setDocumentTitle(`Video Manage`);

  const [videoId, entryId] = useUrlParams('videoId', 'entryId');

  const video = videoDetailApi.useApi({ videoId });

  return (
    <div id="VideoManagePage">
      <MobileHeader title="Video Manage" back />
      <CommonContainer>
        <Link to={VideoRoutes.detail({ entryId, videoId })} className="gray_on_hover">
          <h1>{video.title}</h1>
        </Link>
        <VideoMetadataScanCard />
        <VideoThumbnailGenerateCard />
        <VideoSubtitleUploadCard />
        <VideoEncodeCard />
      </CommonContainer>
    </div>
  );
}
