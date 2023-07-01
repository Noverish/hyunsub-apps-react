import { useContext } from 'react';
import { Button } from 'react-bootstrap';

import { VideoDetailProvider } from './VideoDetailContext';
import { useVideoDetailPageData } from './VideoDetailHooks';
import VideoDetailPageAdminButtons from './components/VideoDetailPageAdminButtons';
import VideoDetailPlayer from './components/VideoDetailPlayer';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader, { MobileHeaderButton } from 'src/components/common/header/MobileHeader';
import { VideoDetailContext } from 'src/pages/video/detail/VideoDetailContext';
import { usePlayNextVideo } from 'src/pages/video/detail/VideoDetailHooks';
import VideoEpisodeSection from 'src/pages/video/detail/components/VideoEpisodeSection';
import VideoGroupSection from 'src/pages/video/detail/components/VideoGroupSection';
import VideoSettingSection from 'src/pages/video/detail/components/VideoSettingSection';
import { useBreakpointMobile } from 'src/utils/breakpoint';
import { setDocumentTitle } from 'src/utils/services';

import './VideoDetailPage.scss';

export function VideoDetailPage() {
  // hooks
  const isMobile = useBreakpointMobile();
  const [{ showSetting }, setState] = useContext(VideoDetailContext);
  const { category, entry, video, seasons, group } = useVideoDetailPageData();
  const { title, metadata } = video;
  const playNextVideo = usePlayNextVideo();

  setDocumentTitle(title);

  // functions
  const showSettingSection = () => {
    setState({ showSetting: true });
  };

  // elements
  const mobileHeaderButtons: MobileHeaderButton[] = [
    {
      icon: 'fas fa-cog',
      onClick: showSettingSection,
    },
  ];

  const metadataElement = metadata ? (
    <div className="metadata">
      {metadata.duration} &middot; {metadata.size} &middot; {metadata.resolution} &middot; {metadata.bitrate}
    </div>
  ) : undefined;

  const sections = (
    <>
      <div id="video_title_section">
        <div>
          <div className="title">{title}</div>
          {metadataElement}
        </div>
        {!isMobile && (
          <Button id="video_setting_btn" variant="secondary" onClick={showSettingSection}>
            Play Setting
          </Button>
        )}
      </div>
      <VideoDetailPageAdminButtons />
      {seasons && <VideoEpisodeSection seasons={seasons} videoId={video.videoId} />}
      {group && <VideoGroupSection category={category} group={group} />}
    </>
  );

  return (
    <div id="VideoDetailPage">
      <MobileHeader title={entry.name} back btns={mobileHeaderButtons} />
      <CommonContainer>
        <VideoDetailPlayer video={video} onEnd={playNextVideo} />
        <VideoSettingSection video={video} />
        {!showSetting && sections}
      </CommonContainer>
    </div>
  );
}

export default function VideoDetailIndex() {
  return (
    <VideoDetailProvider>
      <VideoDetailPage />
    </VideoDetailProvider>
  );
}
