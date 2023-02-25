import { useNavigate } from 'react-router-dom';
import { useBreakpointMobile } from 'src/utils/breakpoint';

import './MobileHeader.scss';

export interface MobileHeaderProps {
  title: string;
  back?: boolean;
  btns?: MobileHeaderButton[];
}

export interface MobileHeaderButton {
  icon: string;
  onClick: () => void;
}

export default function MobileHeader({ title, back, btns }: MobileHeaderProps) {
  const navigate = useNavigate();
  const isMobile = useBreakpointMobile();

  const onBack = () => back ? navigate(-1) : undefined;

  const buttons = (btns || []).map(v => (
    <div key={v.icon} onClick={v.onClick} className="header_btn">
      <i className={v.icon}/>
    </div>
  ));

  if (!isMobile) {
    return <></>;
  }

  return (
    <header className="mobile_header" id="header">
      <div className="title" onClick={onBack}>
        {back && <i className="fas fa-chevron-left"></i>}
        <span>{title}</span>
      </div>
      <div className="buttons">{buttons}</div>
    </header>
  )
}
