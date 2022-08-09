import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useParams, useSearchParams } from "react-router-dom";
import { useVideoDetailQuery } from "src/api/video/video-entry-detail";
import VideoEpisodeSection from "src/components/video/VideoEpisodeSection";
import VideoGroupSection from "src/components/video/VideoGroupSection";
import VideoHeader from "src/components/video/VideoHeader";
import VideoPlayer from "src/components/video/VideoPlayer";
import VideoSettingSection from "src/components/video/VideoSettingSection";
import { VideoMetadata } from "src/model/video";
import { useDispatch, useSelector } from "src/redux";

import './VideoDetailPage.scss';
import { VideoDetailActions } from "./VideoDetailState";

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
  const { showSetting } = useSelector(s => s.video.detail);

  const detail = useVideoDetailQuery({ entryId, videoId });
  const { video, episodes, group } = detail;
  const { title, videoUrl, thumbnailUrl, subtitles, metadata } = video;

  useEffect(() => {
    document.title = title;
  }, [title]);

  const showSettingSection = () => {
    dispatch(VideoDetailActions.update({ showSetting: true }));
  }

  const sections = (
    <>
      <div id="video_title_section">
        <div>
          <h3>{title}</h3>
          {metadata && <VideoMetadataSection metadata={metadata} />}
        </div>
        <Button id="video_setting_btn" variant="secondary" onClick={showSettingSection}>Play Setting</Button>
      </div>
      {episodes && <VideoEpisodeSection episodes={episodes} videoId={video.videoId} />}
      {group && <VideoGroupSection group={group} />}
    </>
  )

  return (
    <div id="VideoDetailPage">
      <VideoHeader />
      <Container id="content">
        <section id="video_player_section">
          <VideoPlayer videoUrl={videoUrl} thumbnailUrl={thumbnailUrl} subtitles={subtitles} />
        </section>
        {showSetting && <VideoSettingSection />}
        {!showSetting && sections}
      </Container>
    </div>
  )
}
