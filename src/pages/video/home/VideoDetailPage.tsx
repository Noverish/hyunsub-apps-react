import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import getVideoDetail from "src/api/video/video-detail";
import VideoHeader from "src/components/video/VideoHeader";
import LoadingPage from "src/pages/LoadingPage";
import NotFoundPage from "src/pages/NotFoundPage";

import './VideoDetailPage.scss';

export default function VideoDetailPage() {
  const entryId = useParams().entryId || '';

  const { data, error } = useQuery(`detail|${entryId}`,() => getVideoDetail({ entryId }));

  useEffect(() => {
    if (data) {
      document.title = data.title;
    }
  }, [data]);
  
  if (error) {
    return <NotFoundPage />;
  }

  if (!data) {
    return <LoadingPage />;
  }

  const tracks = data.subtitles.map(v => (
    <track key={v.label} kind="captions" label={v.label} srcLang={v.srclang} src={v.url} />
  ))

  return (
    <div id="VideoDetailPage">
      <VideoHeader />
      <Container id="content">
        <section id="video_player_section" className="ratio ratio-16x9">
          <video id="player" playsInline controls crossOrigin="use-credentials" poster={data.thumbnailUrl}>
            <source src={data.videoUrl} type="video/mp4" />
            {tracks}
          </video>
        </section>
        <section id="video_title_section">
          <h3>{data.title}</h3>
        </section>
      </Container>
    </div>
  )
}
