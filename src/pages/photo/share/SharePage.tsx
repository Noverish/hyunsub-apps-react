import PhotoHeader from 'src/components/photo/PhotoHeader';
import {Container} from 'react-bootstrap';

export default function SharePage() {
  return (
    <div id="SharePage">
      <PhotoHeader title="Share" />
      <Container id="content" className="with_tab_bar">

      </Container>
    </div>
  )
}
