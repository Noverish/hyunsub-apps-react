import { Button, Container } from 'react-bootstrap';
import PhotoHeader from 'src/components/photo/PhotoHeader';

export default function MenuPage() {
  return (
    <div id="MenuPage">
      <PhotoHeader title="Menu" />
      <Container id="content" className="with_tab_bar">
        <a href="https://apps.hyunsub.kim"><Button>Apps</Button></a>
      </Container>
    </div>
  )
}
