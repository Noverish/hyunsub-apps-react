import { useNavigate } from 'react-router-dom';

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

  const onBack = () => back ? navigate(-1) : undefined;

  return (
    <header className="mobile_header" id="header">
      <div className="title" onClick={onBack}>
        {back && <i className="fas fa-chevron-left"></i>}
        <span>{title}</span>
      </div>
    </header>
  )
}
