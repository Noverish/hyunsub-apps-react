import React from 'react';
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import routes from 'src/pages/apparel/ApparelRoutes';
import { useDispatch } from 'src/redux';
import { logoutAction } from 'src/redux/actions';

const ProfileDropdownToggle = React.forwardRef<HTMLDivElement, React.DOMAttributes<HTMLDivElement>>(({ children, onClick }, ref) => (
  <div
    ref={ref}
    onClick={onClick}
    className="header_icon_btn"
  >
    {children}
  </div>
));

export default function ApparelDesktopHeader() {
  const dispatch = useDispatch();

  const searchBtnClick = () => {
    alert('search btn clicked!');
  }

  const onLogout = () => {
    dispatch(logoutAction());
  }

  return (
    <header className="home_header">
      <div className="container">
        <a href="/" id="header_title" className="gray_on_hover">HyunApparel</a>
        <div id="header_menu_section" className="overflow_scroll">
          <Link to={routes.list} className="gray_on_hover">
            <i className="fas fa-tshirt"></i>
            <span>All Apparels</span>
          </Link>
          <Link to={routes.categoryList} className="gray_on_hover">
            <i className="fas fa-th-large"></i>
            <span>Categories</span>
          </Link>
          <Link to={routes.brandList} className="gray_on_hover">
            <i className="fas fa-tag"></i>
            <span>Brands</span>
          </Link>
        </div>
        <div id="header_button_section">
          <div className="header_icon_btn gray_on_hover" onClick={searchBtnClick}>
            <div className="header_icon_wrapper">
              <i className="fas fa-search"></i>
            </div>
          </div>
          <Dropdown id="header_profile_dropdown" align="end">
            <Dropdown.Toggle as={ProfileDropdownToggle}>
              <div className="header_icon_wrapper header_icon_wrapper_white_bg">
                <i className="fas fa-user"></i>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark">
              <Dropdown.Item as={Link} to={routes.setting}>Setting</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item as="button" className="text-danger" onClick={onLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </header>
  )
}
