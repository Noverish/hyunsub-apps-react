import React from 'react';
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import getCategories from "src/api/video/category";
import { VideoSearchActions } from 'src/pages/video/search/VideoSearchState';
import VideoRoutes from 'src/pages/video/VideoRoutes';
import { useDispatch } from 'src/redux';
import { logoutAction } from 'src/redux/actions';

import './VideoHeader.scss';

function VideoHeaderMenus() {
  const categories = getCategories.useApi();

  const menus = categories.map(v => (
    <Link key={v.name} to={`/${v.name}`} className="gray_on_hover">
      <i className={v.iconHtmlClass}></i>
      <span>{v.displayName}</span>
    </Link>
  ));

  return (<>{menus}</>)
}

const ProfileDropdownToggle = React.forwardRef<HTMLDivElement, React.DOMAttributes<HTMLDivElement>>(({ children, onClick }, ref) => (
  <div
    ref={ref}
    onClick={onClick}
    className="header_icon_btn"
  >
    {children}
  </div>
));

export default function VideoHeader() {
  const dispatch = useDispatch();
  
  const searchBtnClick = () => {
    dispatch(VideoSearchActions.update({ showSearchModal: true }));
  }

  const onLogout = () => {
    dispatch(logoutAction());
  }

  return (
    <header className="home_header">
      <div className="container">
        <a href="/" id="header_title" className="gray_on_hover">HyunFlix</a>
        <div id="header_menu_section" className="overflow_scroll">
          <VideoHeaderMenus />
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
              <Dropdown.Item as={Link} to={VideoRoutes.my}>My Page</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item as="button" className="text-danger" onClick={onLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </header>
  )
}
