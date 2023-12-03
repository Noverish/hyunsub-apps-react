import cs from 'classnames';

import MobileHeaderMoreButton from './MobileHeaderMoreButton';
import { HeaderProps } from 'src/model/component';
import router from 'src/pages/router';
import { useBreakpointMobile } from 'src/utils/breakpoint';

import './MobileHeader.scss';

export default function MobileHeader(props: HeaderProps) {
  const { title, back, btns, onClose, menus, onHeaderClick, onTitleClick, transparent, show } = props;
  const isMobile = useBreakpointMobile();

  const onBack = () => {
    if (back) {
      router.navigate(-1);
    }

    if (onClose) {
      onClose();
    }
  };

  const buttons = (btns || []).map((v) => <i className={v.icon} key={v.icon} onClick={v.onClick} />);

  if (menus) {
    buttons.push(<MobileHeaderMoreButton menus={menus} key="MobileHeaderMoreButton" />);
  }

  if (!isMobile && !show) {
    return <></>;
  }

  return (
    <header className={cs('mobile_header', { transparent })} id="header" onClick={onHeaderClick}>
      <div className="title" onClick={onBack}>
        {back && <i className="fas fa-chevron-left"></i>}
        {onClose && <i className="fas fa-times"></i>}
        <span onClick={onTitleClick}>{title}</span>
      </div>
      <div className="buttons">{buttons}</div>
    </header>
  );
}
