import { Button } from 'react-bootstrap';

import { HeaderProps } from 'src/model/component';
import router from 'src/pages/router';

export default function DesktopHeader(props: HeaderProps) {
  const { title, back, btns, onClose } = props;

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

  return (
    <div className="DesktopHeader d-flex align-items-center justify-content-between mb-3">
      <h1 className="mb-0">
        {back && <i className="fas fa-chevron-left me-3" style={{ cursor: 'pointer' }} onClick={onBack}></i>}
        <span>{title}</span>
      </h1>
      <div className="d-flex gap-2">{desktopHeaderBtns}</div>
    </div>
  );
}
