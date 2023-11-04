import { Button } from 'react-bootstrap';

import CommonContainer from '../header/CommonContainer';
import MobileHeader from '../header/MobileHeader';
import { MobileHeaderButton } from 'src/components/common/header/MobileHeader';
import { useBreakpointMobile } from 'src/utils/breakpoint';
import { setDocumentTitle } from 'src/utils/services';

interface Props {
  className: string;
  title: string;
  children: JSX.Element[];
  btns?: MobileHeaderButton[];
}

export default function CommonLayout(props: Props) {
  const { className, title, children, btns } = props;

  setDocumentTitle(title);

  const isMobile = useBreakpointMobile();

  const desktopHeaderBtns = btns?.map((v) => (
    <Button key={v.icon} onClick={v.onClick}>
      <i className={v.icon} />
    </Button>
  ));

  const desktopHeader = (
    <div className="d-flex align-items-center justify-content-between mb-3">
      <h1 className="mb-0">{title}</h1>
      <div>{desktopHeaderBtns}</div>
    </div>
  );

  return (
    <div className={className}>
      <MobileHeader title={title} btns={btns} />
      <CommonContainer>
        {isMobile || desktopHeader}
        {children}
      </CommonContainer>
    </div>
  );
}
