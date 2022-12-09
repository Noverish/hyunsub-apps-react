import { Container } from 'react-bootstrap';
import CommonMenu from 'src/components/common/header/CommonMenu';
import VideoHeader from 'src/components/video/VideoHeader';

export default function VideoMenuPage() {
  return (
    <div id="VideoMenuPage">
      <VideoHeader title="Menu" />
      <Container id="content" className="with_tab_bar">
        <CommonMenu />
      </Container>
    </div>
  )
}