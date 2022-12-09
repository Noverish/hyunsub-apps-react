import cs from 'classnames';
import { useNavigate } from 'react-router-dom';
import { isApp } from 'src/utils/user-agent';

import './MobileHeader.scss';

export interface MobileHeaderProps {
  title: string;
  back?: boolean;
}

export interface MobileHeaderButton {
  icon: string;
  link: string;
}

export default function MobileHeader({ title, back }: MobileHeaderProps) {
  const navigate = useNavigate();

  const onBack = () => navigate(-1);

  return (
    <header className={cs('mobile_header', { 'is_app': isApp() })} id="header">
      {back && <div className="back" onClick={onBack}><i className="fas fa-chevron-left"></i></div>}
      <div className="title">{title}</div>
    </header>
  )
}
