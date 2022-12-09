import PhotoHeader from 'src/components/photo/PhotoHeader';
import {Container} from 'react-bootstrap';

export default function UploadPage() {
  return (
    <div id="UploadPage">
      <PhotoHeader title="Upload" />
      <Container id="content" className="with_tab_bar">

      </Container>
    </div>
  )
}
