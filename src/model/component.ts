import { To } from 'react-router-dom';

export interface NavigationProps {
  title: string;
  menus: NavigationMenu[];
  disableMenu?: boolean;
  disableSearch?: boolean;
}

export interface NavigationMenu {
  link: To;
  icon: string;
  name: string;
  hideOnDesktop?: boolean;
  hideOnMobile?: boolean;
}

export interface HeaderProps {
  title: string;
  back?: boolean;
  btns?: HeaderButton[];
  menus?: HeaderMoreButton[];
  onClose?: () => void;
  onHeaderClick?: (e: React.MouseEvent<HTMLElement>) => void;
  onTitleClick?: (e: React.MouseEvent<HTMLElement>) => void;
  transparent?: boolean;
  show?: boolean;
}

export interface HeaderButton {
  icon: string;
  name?: string;
  onClick: () => void;
}

export interface HeaderMoreButton {
  icon?: string;
  name: string;
  onClick: () => void;
}
