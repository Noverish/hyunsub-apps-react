import { Button, Container } from 'react-bootstrap';
import ApparelHeader from 'src/components/apparel/ApparelHeader';

export default function ApparelMenuPage() {
  return (
    <div id="ApparelMenuPage">
      <ApparelHeader title="Menu" />
      <Container id="content" className="with_tab_bar">
        <a href="https://apps.hyunsub.kim"><Button>Apps</Button></a>
      </Container>
    </div>
  )
}
