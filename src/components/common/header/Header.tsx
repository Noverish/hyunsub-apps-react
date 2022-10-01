import { To } from "react-router-dom";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

export interface HeaderProps {
  title: string;
  menus: HeaderMenu[];
  dropdowns: HeaderDropdown[];
  onSearch: () => void;
}

export interface HeaderMenu {
  link: To;
  iconClass: string;
  name: string;
}

export interface HeaderDropdown {
  link: To;
  name: string;
}

export function Header(props: HeaderProps) {
  if (window.innerWidth < 738) {
    return <MobileHeader {...props} />
  } else {
    return <DesktopHeader {...props} />
  }
}
