import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import VideoRoutes from '../VideoRoutes';
import videoDetailApi from 'src/api/video/video-detail';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import { useUrlParams } from 'src/hooks/url-params';
import VideoEncodeCard from 'src/pages/video/video-manage/components/VideoEncodeCard';
import VideoMetadataScanCard from 'src/pages/video/video-manage/components/VideoMetadataScanCard';
import VideoSubtitleSyncCard from 'src/pages/video/video-manage/components/VideoSubtitleSyncCard';
import VideoSubtitleUploadCard from 'src/pages/video/video-manage/components/VideoSubtitleUploadCard';
import VideoThumbnailGenerateCard from 'src/pages/video/video-manage/components/VideoThumbnailGenerateCard';

import './VideoManagePage.scss';

export default function VideoManagePage() {
  const [videoId, entryId] = useUrlParams('videoId', 'entryId');

  const video = videoDetailApi.useApi({ videoId });

  return (
    <CommonLayout className="VideoManagePage" title={`Video Manage - ${video.title}`} back>
      <Link to={VideoRoutes.detail({ entryId, videoId })}>
        <Button>Go to Video</Button>
      </Link>
      <VideoMetadataScanCard />
      <VideoThumbnailGenerateCard />
      <VideoSubtitleUploadCard />
      <VideoSubtitleSyncCard subtitles={video.subtitles} />
      <VideoEncodeCard />
    </CommonLayout>
  );
}
