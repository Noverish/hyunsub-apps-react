import { useQuery } from "react-query";
import getCategories from "src/api/video/category";

import './VideoHeader.scss';

interface Props {
}

function VideoHeaderMenus() {
  const categories = useQuery('categories', () => getCategories()).data!!;

  const menus = categories.map(v => (
    <a key={v.name} href={`/${v.name}`} className="gray_on_hover">
      <i className={v.htmlClass}></i>
      <span>{v.displayName}</span>
    </a>
  ));

  return (<>{menus}</>)
}

export default function VideoHeader(props: Props) {
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
          <div className="header_icon_btn" data-bs-toggle="dropdown">
            <div className="header_icon_wrapper header_icon_wrapper_white_bg">
              <i className="fas fa-user"></i>
            </div>
          </div>
          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
            <li><a className="dropdown-item" href="/my">My Page</a></li>
            <li><a className="dropdown-item text-danger" href="#">Logout</a></li>
          </ul>
        </div>
      </div>
    </header>
  )
}
