import cs from 'classnames';
import { Button } from 'react-bootstrap';

import { HeaderProps } from 'src/model/component';
import router from 'src/pages/router';
import { useBreakpointMobile } from 'src/utils/breakpoint';

export default function DesktopHeader(props: HeaderProps) {
  const { title, back, btns, onClose, menus } = props;
  const isMobile = useBreakpointMobile();

  const onBack = () => {
    if (back) {
      router.navigate(-1);
    }

    if (onClose) {
      onClose();
    }
  };

  const desktopHeaderBtns = btns?.map((v) => (
    <Button key={v.icon} onClick={v.onClick}>
      <i className={v.icon} />
      {v.name && <span className="ms-2">{v.name}</span>}
    </Button>
  ));

  const desktopHeaderMoreBtns = menus?.map((v) => (
    <Button key={v.name} onClick={v.onClick}>
      {v.icon && <i className={cs(v.icon, 'me-2')} />}
      <span>{v.name}</span>
    </Button>
  ));

  if (isMobile) {
    return <></>;
  }

  return (
    <div className="DesktopHeader d-flex align-items-center justify-content-between mb-3">
      <h1 className="mb-0">
        {back && <i className="fas fa-chevron-left me-3" style={{ cursor: 'pointer' }} onClick={onBack}></i>}
        {onClose && <i className="fas fa-times me-3" style={{ cursor: 'pointer' }} onClick={onBack}></i>}
        <span>{title}</span>
      </h1>
      <div className="d-flex gap-2">
        {desktopHeaderBtns}
        {desktopHeaderMoreBtns}
      </div>
    </div>
  );
}
