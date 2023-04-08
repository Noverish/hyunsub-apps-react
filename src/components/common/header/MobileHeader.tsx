import { useNavigate } from 'react-router-dom';
import { useBreakpointMobile } from 'src/utils/breakpoint';
import cs from 'classnames';

import './MobileHeader.scss';

export interface MobileHeaderProps {
  title: string;
  back?: boolean;
  btns?: MobileHeaderButton[];
  onClose?: () => void;
}

export interface MobileHeaderButton {
  icon?: string;
  text?: string;
  onClick: () => void;
}

export default function MobileHeader({ title, back, btns, onClose }: MobileHeaderProps) {
  const navigate = useNavigate();
  const isMobile = useBreakpointMobile();

  const onBack = () => {
    if (back) {
      navigate(-1);
    }

    if (onClose) {
      onClose();
    }
  };

  const buttons = (btns || []).map(v => (
    <div key={v.icon ? v.icon : v.text} onClick={v.onClick} className={cs('header_btn', { icon: !!v.icon, text: !!v.text })}>
      {v.icon && <i className={v.icon}/>}
      {v.text && <span>{v.text}</span>}
    </div>
  ));

  if (!isMobile) {
    return <></>;
  }

  return (
    <header className="mobile_header" id="header">
      <div className="title" onClick={onBack}>
        {back && <i className="fas fa-chevron-left"></i>}
        {onClose && <i className="fas fa-times"></i>}
        <span>{title}</span>
      </div>
      <div className="buttons">{buttons}</div>
    </header>
  )
}
