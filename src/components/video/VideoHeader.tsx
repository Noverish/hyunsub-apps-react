import getCategories from "src/api/video/category";
import { VideoSearchActions } from 'src/pages/video/search/VideoSearchState';
import VideoRoutes from 'src/pages/video/VideoRoutes';
import { dispatch } from 'src/redux';
import { useBreakpointSm } from 'src/utils/breakpoint';
import DesktopHeader, { DesktopHeaderProps } from '../common/header/DesktopHeader';
import MobileHeader, { MobileHeaderProps } from '../common/header/MobileHeader';

export default function VideoHeader(props: MobileHeaderProps) {
  const categories = getCategories.useApi({});

  const menus = categories.map(v => ({
    name: v.displayName,
    icon: v.iconHtmlClass,
    link: VideoRoutes.listRoute(v.name),
  }))

  const desktopProps: DesktopHeaderProps = {
    title: 'HyunVideo',
    menus,
    dropdowns: [
      {
        name: 'My Page',
        link: VideoRoutes.my,
      }
    ],
    onSearch: () => {
      dispatch(VideoSearchActions.update({ showSearchModal: true }));
    },
  }

  if (useBreakpointSm()) {
    return <MobileHeader {...props} />
  } else {
    return <DesktopHeader {...desktopProps} />
  }
}
