import { t } from 'i18next';
import { Link, useLocation } from 'react-router-dom';

import { CommonNavigationMenu, CommonNavigationProps } from 'src/model/component';
import CommonRoutes from 'src/pages/common/CommonRoutes';
import { useBreakpointMobile } from 'src/utils/breakpoint';

import './CommonTabBar.scss';

export default function CommonTabBar({ menus }: CommonNavigationProps) {
  const location = useLocation();
  const isMobile = useBreakpointMobile();

  const newItems: CommonNavigationMenu[] = [
    ...menus,
    {
      name: t('CommonNavigation.search'),
      link: CommonRoutes.search,
      icon: 'fas fa-search',
    },
    {
      name: t('CommonNavigation.menu'),
      link: CommonRoutes.menu,
      icon: 'fas fa-bars',
    },
  ];

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
