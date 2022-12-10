import { ReactNode } from "react";
import { Container } from "react-bootstrap";
import { isMobile } from 'src/utils/user-agent';

import './CommonContainer.scss';

interface Props {
  children?: ReactNode | undefined;
}

export default function CommonContainer({ children }: Props) {
  const className = isMobile() ? 'is_mobile' : 'is_desktop';

  return (
    <Container id="container" className={className}>
      <div className="top" />
      <div className="content">{children}</div>
      <div className="bottom" />
    </Container>
  )
}
