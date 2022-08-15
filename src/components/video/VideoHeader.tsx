import React from 'react';
import { Dropdown } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import getCategories from "src/api/video/category";
import VideoRoutes from 'src/pages/video/VideoRoutes';

import './VideoHeader.scss';

function VideoHeaderMenus() {
  const categories = useQuery('categories', () => getCategories()).data!!;

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
  return (
    <header className="home_header">
      <div className="container">
        <a href="/" id="header_title" className="gray_on_hover">HyunFlix</a>
        <div id="header_menu_section" className="overflow_scroll">
          <VideoHeaderMenus />
        </div>
        <div id="header_button_section">
          <div className="header_icon_btn gray_on_hover" data-bs-toggle="modal" data-bs-target="#search_modal">
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
              <Dropdown.Item as="button" className="text-danger">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </header>
  )
}
