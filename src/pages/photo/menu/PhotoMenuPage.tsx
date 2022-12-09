import { Container } from 'react-bootstrap';
import CommonMenu from 'src/components/common/header/CommonMenu';
import PhotoHeader from 'src/components/photo/PhotoHeader';

export default function PhotoMenuPage() {
  return (
    <div id="PhotoMenuPage">
      <PhotoHeader title="Menu" />
      <Container id="content" className="with_tab_bar">
        <CommonMenu />
      </Container>
    </div>
  )
}
