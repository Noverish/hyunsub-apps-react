import CommonNavBar from './CommonNavBar';
import CommonTabBar from './CommonTabBar';
import { NavigationProps } from 'src/model/component';
import { useBreakpointMobile } from 'src/utils/breakpoint';

export default function CommonNavigation(props: NavigationProps) {
  const isMobile = useBreakpointMobile();

  if (isMobile) {
    return <CommonTabBar {...props} />;
  } else {
    return <CommonNavBar {...props} />;
  }
}
