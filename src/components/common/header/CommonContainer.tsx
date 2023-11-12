import cs from 'classnames';
import { ReactNode } from 'react';

import { useBreakpointMobile } from 'src/utils/breakpoint';

import './CommonContainer.scss';

interface Props {
  noContainer?: boolean;
  children?: ReactNode | undefined;
}

export default function CommonContainer({ children, noContainer }: Props) {
  const className = useBreakpointMobile() ? 'is_mobile' : 'is_desktop';

  return (
    <div id="CommonContainer" className={cs(className, 'container-md')}>
      <div className="content">{children}</div>
    </div>
  );
}
