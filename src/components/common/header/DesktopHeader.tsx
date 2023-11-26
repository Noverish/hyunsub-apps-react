import React from 'react';
import { Container, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link, To } from 'react-router-dom';

import useLogout from 'src/hooks/logout';
import CommonRoutes from 'src/pages/common/CommonRoutes';
import router from 'src/pages/router';
import { useBreakpointMobile } from 'src/utils/breakpoint';
import AppConstant from 'src/utils/constants';

import './DesktopHeader.scss';

export interface DesktopHeaderProps {
  title: string;
  menus: DesktopHeaderMenu[];
  dropdowns: DesktopHeaderDropdown[];
}

export interface DesktopHeaderMenu {
  link: To;
  icon: string;
  name: string;
}

export interface DesktopHeaderDropdown {
  link: To;
  name: string;
}

const ProfileDropdownToggle = React.forwardRef<HTMLDivElement, React.DOMAttributes<HTMLDivElement>>(
  ({ children, onClick }, ref) => (
    <div ref={ref} onClick={onClick} className="header_profile_dropdown_toggle gray_on_hover">
      {children}
    </div>
  ),
);

export default function DesktopHeader(props: DesktopHeaderProps) {
  const { menus, dropdowns, title } = props;
  const { t } = useTranslation();
  const isMobile = useBreakpointMobile();
  const logout = useLogout();

  const goToApps = () => {
    window.location.href = AppConstant.APPS_HOME;
  };

  const goToProfile = () => {
    window.location.href = AppConstant.PROFILE_HOME;
  };

  const onSearch = () => {
    router.navigate(CommonRoutes.search);
  };

  if (isMobile) {
    return <></>;
  }

  const menuElements = menus.map((v) => (
    <Link key={v.name} to={v.link} className="gray_on_hover">
      <i className={v.icon}></i>
      <span>{v.name}</span>
    </Link>
  ));

  const dropdownElements = dropdowns.map((v) => (
    <Dropdown.Item key={v.name} as={Link} to={v.link}>
      {v.name}
    </Dropdown.Item>
  ));

  return (
    <header className="desktop_header" id="header">
      <Container className="desktop_header_inner">
        <a href="/" id="header_title" className="gray_on_hover">
          {title}
        </a>
        <div id="header_menu_section" className="overflow_scroll">
          {menuElements}
        </div>
        <div id="header_button_section">
          <div className="header_icon_btn gray_on_hover" onClick={onSearch}>
            <i className="fas fa-search"></i>
          </div>
          <Dropdown id="header_profile_dropdown" align="end">
            <Dropdown.Toggle as={ProfileDropdownToggle}>
              <i className="fas fa-user-circle"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark">
              {dropdownElements}
              {dropdownElements.length > 0 && <Dropdown.Divider />}
              <Dropdown.Item as="button" onClick={goToApps}>
                {t('applications')}
              </Dropdown.Item>
              <Dropdown.Item as="button" onClick={goToProfile}>
                {t('profile')}
              </Dropdown.Item>
              <Dropdown.Item as="button" className="text-danger" onClick={logout}>
                {t('logout')}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </header>
  );
}
