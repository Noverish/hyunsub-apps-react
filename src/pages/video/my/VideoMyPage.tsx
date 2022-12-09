import { Container } from "react-bootstrap";
import VideoHeader from "src/components/video/VideoHeader";

export default function VideoMyPage() {
  return (
    <div id="VideoMyPage">
      <VideoHeader title="내 정보" />
      <Container id="content" className="d-grid gap-3">
        <h1>내 정보</h1>
      </Container>
    </div>
  )
}
