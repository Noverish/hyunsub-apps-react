import { To } from 'react-router-dom';

export interface CommonNavigationProps {
  title: string;
  menus: CommonNavigationMenu[];
}

export interface CommonNavigationMenu {
  link: To;
  icon: string;
  name: string;
  hideOnDesktop?: boolean;
  hideOnMobile?: boolean;
}
