import { Button, Container } from 'react-bootstrap';
import VideoHeader from 'src/components/video/VideoHeader';

export default function VideoMenuPage() {
  return (
    <div id="VideoMenuPage">
      <VideoHeader title="Menu" />
      <Container id="content" className="with_tab_bar">
        <a href="https://apps.hyunsub.kim"><Button>Apps</Button></a>
      </Container>
    </div>
  )
}
