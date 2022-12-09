import { useNavigate } from 'react-router-dom';

import './MobileHeaderV2.scss';

export interface MobileHeaderProps {
  title: string;
  back?: boolean;
}

export interface MobileHeaderButton {
  icon: string;
  link: string;
}

export default function MobileHeaderV2({ title, back }: MobileHeaderProps) {
  const navigate = useNavigate();

  const onBack = () => navigate(-1);

  return (
    <header className="mobile_header_v2" id="header">
      {back && <div className="back" onClick={onBack}><i className="fas fa-chevron-left"></i></div>}
      <div className="title">{title}</div>
    </header>
  )
}
