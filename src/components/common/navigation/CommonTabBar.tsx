import { t } from 'i18next';
import { Link, useLocation } from 'react-router-dom';

import { NavigationProps } from 'src/model/component';
import CommonRoutes from 'src/pages/common/CommonRoutes';
import { useBreakpointMobile } from 'src/utils/breakpoint';

import './CommonTabBar.scss';

export default function CommonTabBar(props: NavigationProps) {
  const { menus, disableMenu, disableSearch } = props;
  const location = useLocation();
  const isMobile = useBreakpointMobile();

  const newItems = [...menus];

  if (!disableSearch) {
    newItems.push({
      name: t('CommonNavigation.search'),
      link: CommonRoutes.search,
      icon: 'fas fa-search',
    });
  }

  if (!disableMenu) {
    newItems.push({
      name: t('CommonNavigation.menu'),
      link: CommonRoutes.menu,
      icon: 'fas fa-bars',
    });
  }

  const show = newItems.filter((v) => v.link === location.pathname).length > 0;

  const elements = newItems
    .filter((v) => !v.hideOnMobile)
    .map((v) => (
      <Link key={v.icon} to={v.link}>
        <i className={v.icon} />
        <span>{v.name}</span>
      </Link>
    ));

  if (!show || !isMobile) {
    return <></>;
  }

  return <div id="TabBar">{elements}</div>;
}
