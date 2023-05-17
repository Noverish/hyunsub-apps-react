import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import VideoRoutes from '../VideoRoutes';
import { useLoadVideoDetailPage, useVideoDetailPageParams } from './VideoDetailHooks';
import { VideoDetailProvider } from './VideoDetailContext';
import VideoDetailPlayer from './components/VideoDetailPlayer';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader, { MobileHeaderButton } from 'src/components/common/header/MobileHeader';
import { VideoDetailContext } from 'src/pages/video/detail/VideoDetailContext';
import VideoEpisodeSection from 'src/pages/video/detail/components/VideoEpisodeSection';
import VideoGroupSection from 'src/pages/video/detail/components/VideoGroupSection';
import VideoSettingSection from 'src/pages/video/detail/components/VideoSettingSection';
import { useSelector } from 'src/redux';
import { useBreakpointMobile } from 'src/utils/breakpoint';
import { setDocumentTitle } from 'src/utils/services';

import './VideoDetailPage.scss';

export function VideoDetailPage() {
  const { entryId } = useVideoDetailPageParams();
  const isMobile = useBreakpointMobile();
  const [{ showSetting }, setState] = useContext(VideoDetailContext);
  const isAdmin = useSelector((s) => s.global.tokenPayload?.isAdmin || false);
  const data = useLoadVideoDetailPage();
  const { category, entry, video, seasons, group } = data;
  const { title, metadata } = video;

  setDocumentTitle(title);

  const showSettingSection = () => {
    setState({ showSetting: true });
  };

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

  const adminBtns = (
    <>
      <hr />
      <div className="admin_btns">
        <Link to={VideoRoutes.videoManage(video.videoId)}>
          <Button>Video Manage</Button>
        </Link>
        <Link to={VideoRoutes.entryManage(entryId)}>
          <Button>Entry Manage</Button>
        </Link>
      </div>
    </>
  );

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
      {isAdmin && adminBtns}
      {seasons && <VideoEpisodeSection seasons={seasons} videoId={video.videoId} />}
      {group && <VideoGroupSection category={category} group={group} />}
    </>
  );

  return (
    <div id="VideoDetailPage">
      <MobileHeader title={entry.name} back btns={mobileHeaderButtons} />
      <CommonContainer>
        <VideoDetailPlayer video={video} />
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
