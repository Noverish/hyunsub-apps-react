import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { NavigationProps } from 'src/model/component';
import CommonRoutes from 'src/pages/common/CommonRoutes';
import router from 'src/pages/router';

import './CommonNavBar.scss';

export default function CommonNavBar(props: NavigationProps) {
  const { menus, title } = props;

  const goToSearch = () => {
    router.navigate(CommonRoutes.search);
  };

  const goToMenu = () => {
    router.navigate(CommonRoutes.menu);
  };

  const menuElements = menus
    .filter((v) => !v.hideOnDesktop)
    .map((v) => (
      <Link key={v.name} to={v.link} className="gray_on_hover">
        <i className={v.icon}></i>
        <span>{v.name}</span>
      </Link>
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
          <div className="header_icon_btn gray_on_hover" onClick={goToSearch}>
            <i className="fas fa-search"></i>
          </div>
          <div className="header_icon_btn gray_on_hover" onClick={goToMenu}>
            <i className="fas fa-user-circle"></i>
          </div>
        </div>
      </Container>
    </header>
  );
}
