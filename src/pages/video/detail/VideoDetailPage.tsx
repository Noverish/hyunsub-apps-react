import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useQuery } from "react-query";
import { useParams, useSearchParams } from "react-router-dom";
import getVideoEntryDetail from "src/api/video/video-entry-detail";
import VideoEpisodeSection from "src/components/video/VideoEpisodeSection";
import VideoGroupSection from "src/components/video/VideoGroupSection";
import VideoHeader from "src/components/video/VideoHeader";
import VideoPlayer from "src/components/video/VideoPlayer";
import { VideoMetadata } from "src/model/video";

import './VideoDetailPage.scss';

function VideoMetadataSection({ metadata }: { metadata: VideoMetadata }) {
  return (
    <section className="mt-1">
      <span>{metadata.duration} &middot; {metadata.size} &middot; {metadata.resolution} &middot; {metadata.bitrate}</span>
    </section>
  )
}

export default function VideoDetailPage() {
  const [searchParams] = useSearchParams();
  const entryId = useParams().entryId || '';
  const videoId = searchParams.get('videoId') ?? undefined;

  const detail = useQuery(`entry|${entryId}|${videoId}`, () => getVideoEntryDetail({ entryId, videoId })).data!!;
  const { video, episodes, group } = detail;
  const { title, videoUrl, thumbnailUrl, subtitles, metadata } = video;

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div id="VideoDetailPage">
      <VideoHeader />
      <Container id="content">
        <section id="video_player_section">
          <VideoPlayer videoUrl={videoUrl} thumbnailUrl={thumbnailUrl} subtitles={subtitles} />
        </section>
        <section id="video_title_section">
          <h3>{title}</h3>
        </section>
        {metadata && <VideoMetadataSection metadata={metadata} />}
        {episodes && <VideoEpisodeSection episodes={episodes} videoId={video.videoId} />}
        {group && <VideoGroupSection group={group} />}
      </Container>
    </div>
  )
}
