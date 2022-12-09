import { ReactNode } from "react";
import { Container } from "react-bootstrap";
import { isApp, isMobile } from 'src/utils/user-agent';

import './CommonContainer.scss';

interface Props {
  children?: ReactNode | undefined;
}

function getClassName() {
  if (isApp()) return 'is_app';
  if (isMobile()) return 'is_mobile';
  else return 'is_desktop';
}

export default function CommonContainer({ children }: Props) {
  const className = getClassName();

  return (
    <Container id="container" className={className}>
      <div className="top" />
      <div className="content">{children}</div>
      <div className="bottom" />
    </Container>
  )
}
