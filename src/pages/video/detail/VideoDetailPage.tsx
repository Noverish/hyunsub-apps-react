import { useContext } from 'react';
import { Button } from "react-bootstrap";
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader, { MobileHeaderButton } from 'src/components/common/header/MobileHeader';
import VideoAdminSection from "src/components/video/admin/VideoAdminSection";
import VideoEpisodeSection from "src/pages/video/detail/components/VideoEpisodeSection";
import VideoGroupSection from "src/pages/video/detail/components/VideoGroupSection";
import VideoSettingSection from "src/pages/video/detail/components/VideoSettingSection";
import { VideoDetailContext } from 'src/pages/video/detail/VideoDetailState';
import { useSelector } from "src/redux";
import { useBreakpointMobile } from "src/utils/breakpoint";
import { setDocumentTitle } from "src/utils/services";
import { useLoadVideoDetailPage, useVideoDetailPageParams } from "./VideoDetailHooks";
import { VideoDetailProvider } from "./VideoDetailState";
import VideoDetailPlayer from './components/VideoDetailPlayer';

import './VideoDetailPage.scss';

export function VideoDetailPage() {
  const { entryId } = useVideoDetailPageParams();
  const isMobile = useBreakpointMobile();
  const [{ showSetting, showAdmin }, setState] = useContext(VideoDetailContext);
  const isAdmin = useSelector(s => s.global.tokenPayload?.isAdmin || false);
  const data = useLoadVideoDetailPage();
  const { category, entry, video, seasons, group } = data;
  const { title, metadata } = video;

  setDocumentTitle(title);

  const showSettingSection = () => {
    setState({ showSetting: true });
  }

  const showAdminSection = () => {
    setState({ showAdmin: true });
  }

  const mobileHeaderButtons: MobileHeaderButton[] = [
    {
      icon: 'fas fa-cog',
      onClick: showSettingSection,
    }
  ]

  if (isAdmin) {
    mobileHeaderButtons.push({
      icon: 'fas fa-cogs',
      onClick: showAdminSection,
    })
  }

  const metadataElement = metadata
    ? <div className="metadata">{metadata.duration} &middot; {metadata.size} &middot; {metadata.resolution} &middot; {metadata.bitrate}</div>
    : undefined;

  const sections = (
    <>
      <div id="video_title_section">
        <div>
          <div className="title">{title}</div>
          {metadataElement}
        </div>
        {!isMobile && isAdmin && <Button id="video_admin_btn" variant="secondary" onClick={showAdminSection}>Admin Setting</Button>}
        {!isMobile && <Button id="video_setting_btn" variant="secondary" onClick={showSettingSection}>Play Setting</Button>}
      </div>
      {seasons && <VideoEpisodeSection seasons={seasons} videoId={video.videoId} />}
      {group && <VideoGroupSection category={category} group={group} />}
    </>
  )

  return (
    <div id="VideoDetailPage">
      <MobileHeader title={entry.name} back btns={mobileHeaderButtons} />
      <CommonContainer>
        <VideoDetailPlayer video={video} />
        <VideoSettingSection video={video} />
        {showAdmin && <VideoAdminSection detail={data} entryId={entryId} />}
        {!showSetting && !showAdmin && sections}
      </CommonContainer>
    </div>
  )
}

export default function VideoDetailIndex() {
  return (
    <VideoDetailProvider>
      <VideoDetailPage />
    </VideoDetailProvider>
  )
}
