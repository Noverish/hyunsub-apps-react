import { Container } from 'react-bootstrap';
import ApparelHeader from 'src/components/apparel/ApparelHeader';
import CommonMenu from 'src/components/common/header/CommonMenu';

export default function ApparelMenuPage() {
  return (
    <div id="ApparelMenuPage">
      <ApparelHeader title="Menu" />
      <Container id="content" className="with_tab_bar">
        <CommonMenu />
      </Container>
    </div>
  )
}
