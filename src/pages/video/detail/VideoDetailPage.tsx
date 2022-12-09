import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useParams, useSearchParams } from "react-router-dom";
import { useIsAdmin } from "src/api/auth/authorities";
import getCategories from "src/api/video/category";
import getVideoDetail from "src/api/video/video-entry-detail";
import CommonContainer from 'src/components/common/header/CommonContainer';
import VideoAdminSection from "src/components/video/admin/VideoAdminSection";
import SimpleVideoPlayer from "src/components/video/SimpleVideoPlayer";
import VideoEpisodeSection from "src/components/video/VideoEpisodeSection";
import VideoGroupSection from "src/components/video/VideoGroupSection";
import VideoHeader from "src/components/video/VideoHeader";
import VideoPlayer from "src/components/video/VideoPlayer";
import VideoSettingSection from "src/components/video/VideoSettingSection";
import { VideoMetadata } from "src/model/video";
import { useDispatch, useSelector } from "src/redux";
import { isIOS } from "src/utils/user-agent";
import { VideoDetailActions } from "./VideoDetailState";

import './VideoDetailPage.scss';

function VideoMetadataSection({ metadata }: { metadata: VideoMetadata }) {
  return (
    <div>
      <span>{metadata.duration} &middot; {metadata.size} &middot; {metadata.resolution} &middot; {metadata.bitrate}</span>
    </div>
  )
}

export default function VideoDetailPage() {
  const [searchParams] = useSearchParams();
  const entryId = useParams().entryId || '';
  const videoId = searchParams.get('videoId') ?? undefined;

  const dispatch = useDispatch();
  const { showSetting, showAdmin } = useSelector(s => s.video.detail);

  const isAdmin = useIsAdmin();
  const detail = getVideoDetail.useApi({ entryId, videoId });
  const { category: categoryName, video, episodes, group } = detail;
  const { title, videoUrl, thumbnailUrl, subtitles, metadata } = video;

  const categories = getCategories.useApi();
  const category = categories.filter(v => v.name === categoryName)[0];

  useEffect(() => {
    document.title = title;
  }, [title]);

  const showSettingSection = () => {
    dispatch(VideoDetailActions.update({ showSetting: true }));
  }

  const showAdminSection = () => {
    dispatch(VideoDetailActions.update({ showAdmin: true }));
  }

  const sections = (
    <>
      <div id="video_title_section">
        <div>
          <h3>{title}</h3>
          {metadata && <VideoMetadataSection metadata={metadata} />}
        </div>
        {isAdmin && <Button id="video_admin_btn" variant="secondary" onClick={showAdminSection}>Admin Setting</Button>}
        <Button id="video_setting_btn" variant="secondary" onClick={showSettingSection}>Play Setting</Button>
      </div>
      {episodes && <VideoEpisodeSection episodes={episodes} videoId={video.videoId} />}
      {group && <VideoGroupSection category={category} group={group} />}
    </>
  )

  const videoPlayer = isIOS()
    ? <SimpleVideoPlayer videoUrl={videoUrl} thumbnailUrl={thumbnailUrl} subtitles={subtitles} />
    : <VideoPlayer videoUrl={videoUrl} thumbnailUrl={thumbnailUrl} subtitles={subtitles} />;

  return (
    <div id="VideoDetailPage">
      <VideoHeader title={title} back={true} />
      <CommonContainer>
        <section id="video_player_section">
          {videoPlayer}
        </section>
        {showSetting && <VideoSettingSection video={video} />}
        {showAdmin && <VideoAdminSection detail={detail} entryId={entryId} />}
        {!showSetting && !showAdmin && sections}
      </CommonContainer>
    </div>
  )
}
