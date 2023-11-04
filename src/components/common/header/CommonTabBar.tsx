import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import CommonRoutes from 'src/pages/common/CommonRoutes';
import { useBreakpointMobile } from 'src/utils/breakpoint';

import './CommonTabBar.scss';

interface Props {
  items: TabBarItem[];
}

export interface TabBarItem {
  icon: string;
  name: string;
  link: string;
}

export default function CommonTabBar({ items }: Props) {
  const { t } = useTranslation();
  const location = useLocation();
  const isMobile = useBreakpointMobile();

  const newItems: TabBarItem[] = [
    ...items,
    {
      name: t('CommonTabBar.search'),
      link: CommonRoutes.search,
      icon: 'fas fa-search',
    },
    {
      name: t('CommonTabBar.menu'),
      link: CommonRoutes.menu,
      icon: 'fas fa-bars',
    },
  ];

  const show = newItems.filter((v) => v.link === location.pathname).length > 0;

  const elements = newItems.map((v) => (
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
