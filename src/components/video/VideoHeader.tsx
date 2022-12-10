import getCategories from "src/api/video/category";
import { VideoSearchActions } from 'src/pages/video/search/VideoSearchState';
import VideoRoutes from 'src/pages/video/VideoRoutes';
import { useDispatch } from 'src/redux';
import { isMobile } from 'src/utils/user-agent';
import DesktopHeader, { DesktopHeaderProps } from '../common/header/DesktopHeader';
import MobileHeader, { MobileHeaderProps } from '../common/header/MobileHeader';

export default function VideoHeader(props: MobileHeaderProps) {
  const dispatch = useDispatch();

  const categories = getCategories.useApi();

  const menus = categories.map(v => ({
    name: v.displayName,
    iconClass: v.iconHtmlClass,
    link: `/${v.name}`
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

  if (isMobile()) {
    return <MobileHeader {...props} />
  } else {
    return <DesktopHeader {...desktopProps} />
  }
}
