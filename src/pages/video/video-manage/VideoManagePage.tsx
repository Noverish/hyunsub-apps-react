import VideoManageHooks from './VideoManageHooks';
import videoDetailApi from 'src/api/video/video-detail';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import VideoEncodeCard from 'src/pages/video/video-manage/components/VideoEncodeCard';
import VideoMetadataCard from 'src/pages/video/video-manage/components/VideoMetadataCard';
import VideoRenameCard from 'src/pages/video/video-manage/components/VideoRenameCard';
import VideoSubtitleSyncCard from 'src/pages/video/video-manage/components/VideoSubtitleSyncCard';
import VideoSubtitleUploadCard from 'src/pages/video/video-manage/components/VideoSubtitleUploadCard';
import VideoThumbnailCard from 'src/pages/video/video-manage/components/VideoThumbnailCard';

import './VideoManagePage.scss';

export default function VideoManagePage() {
  const { videoId } = VideoManageHooks.usePageParams();

  const { data } = videoDetailApi.useApiResult({ videoId });
  const title = data?.title ?? '';
  const subtitles = data?.subtitles ?? [];

  return (
    <CommonLayout className="VideoManagePage" title={`Video Manage - ${title}`} back>
      <VideoMetadataCard />
      <VideoThumbnailCard />
      <VideoSubtitleUploadCard />
      {subtitles.length > 0 ? <VideoSubtitleSyncCard subtitles={subtitles} /> : undefined}
      <VideoEncodeCard />
      <VideoRenameCard />
    </CommonLayout>
  );
}
