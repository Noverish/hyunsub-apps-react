import cs from 'classnames';
import { ReactNode } from "react";
import { isMobile } from 'src/utils/user-agent';

import './CommonContainer.scss';

interface Props {
  noContainer?: boolean;
  children?: ReactNode | undefined;
}

export default function CommonContainer({ children, noContainer }: Props) {
  const className = isMobile() ? 'is_mobile' : 'is_desktop';
  const className2 = noContainer ? 'no_container' : 'container';

  return (
    <div id="CommonContainer" className={cs(className, className2)}>
      <div className="top" />
      <div className="content">{children}</div>
      <div className="bottom" />
    </div>
  )
}
