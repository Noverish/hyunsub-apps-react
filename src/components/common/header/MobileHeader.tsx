import React, { useState } from 'react';
import { Dropdown, Offcanvas } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useDispatch } from 'src/redux';
import { logoutAction } from 'src/redux/actions';
import { HeaderProps } from "./Header";
import {useIsAdmin} from 'src/api/auth/authorities';

import './MobileHeader.scss';

const ProfileDropdownToggle = React.forwardRef<HTMLDivElement, React.DOMAttributes<HTMLDivElement>>(({ children, onClick }, ref) => (
  <div
    ref={ref}
    onClick={onClick}
    className="header_profile_dropdown_toggle gray_on_hover"
  >
    {children}
  </div>
));

export default function MobileHeader(props: HeaderProps) {
  const { menus, onSearch, dropdowns, title } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isAdmin = useIsAdmin();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onLogout = () => {
    dispatch(logoutAction());
  }

  const menuElements = menus.map(v => (
    <Link key={v.name} to={v.link} className="menu_item">
      <i className={v.iconClass}></i>
      <span>{v.name}</span>
    </Link>
  ));

  const dropdownElements = dropdowns.map(v => (
    <Dropdown.Item key={v.name} as={Link} to={v.link}>{v.name}</Dropdown.Item>
  ));

  return (
    <>
      <header className="mobile_header" id="header">
        <div className="left">
          <div className="menu_btn" onClick={handleShow}>
            <i className="fas fa-bars"></i>
          </div>
        </div>
        <div className="center">
          <a href="/" id="header_title">{title}</a>
        </div>
        <div className="right">
          <Dropdown id="header_profile_dropdown" align="end">
            <Dropdown.Toggle as={ProfileDropdownToggle}>
              <i className="fas fa-user-circle"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark">
              {dropdownElements}
              <Dropdown.Divider />
              {isAdmin && <Dropdown.Item as={Link} to="/admin">Admin</Dropdown.Item>}
              <Dropdown.Item as="button" className="text-danger" onClick={onLogout}>{t('logout')}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{t('menus')}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {menuElements}
          <div onClick={onSearch} className="menu_item">
            <i className="fas fa-search"></i>
            <span>{t('search')}</span>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}
