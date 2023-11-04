import { Button } from 'react-bootstrap';

import CommonContainer from '../header/CommonContainer';
import MobileHeader from '../header/MobileHeader';
import { MobileHeaderButton } from 'src/components/common/header/MobileHeader';
import router from 'src/pages/router';
import { useBreakpointMobile } from 'src/utils/breakpoint';
import { setDocumentTitle } from 'src/utils/services';

interface Props {
  className: string;
  title: string;
  children: React.ReactNode;
  btns?: MobileHeaderButton[];
  back?: boolean;
}

export default function CommonLayout(props: Props) {
  const { className, title, children, btns, back } = props;

  setDocumentTitle(title);

  const isMobile = useBreakpointMobile();

  const desktopHeaderBtns = btns?.map((v) => (
    <Button key={v.icon} onClick={v.onClick}>
      <i className={v.icon} />
      {v.name && <span className="ms-2">{v.name}</span>}
    </Button>
  ));

  const onBack = () => router.navigate(-1);

  const desktopHeader = (
    <div className="d-flex align-items-center justify-content-between mb-3">
      <h1 className="mb-0">
        {back && <i className="fas fa-chevron-left me-3" style={{ cursor: 'pointer' }} onClick={onBack}></i>}
        <span>{title}</span>
      </h1>
      <div className="d-flex gap-2">{desktopHeaderBtns}</div>
    </div>
  );

  return (
    <div className={className}>
      <MobileHeader title={title} btns={btns} back={back} />
      <CommonContainer>
        {isMobile || desktopHeader}
        {children}
      </CommonContainer>
    </div>
  );
}
