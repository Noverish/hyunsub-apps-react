import { t } from 'i18next';
import { useContext } from 'react';

import CommonNavigation from 'src/components/common/navigation/CommonNavigation';
import { VideoCategoryContext } from 'src/context/video/VideoCategoryContext';
import { NavigationProps } from 'src/model/component';
import VideoRoutes from 'src/pages/video/VideoRoutes';

export default function VideoNavigation() {
  const categories = useContext(VideoCategoryContext);

  const menus = categories.map((v) => ({
    name: v.displayName,
    icon: v.iconHtmlClass,
    link: VideoRoutes.list(v.name),
    hideOnMobile: true,
  }));

  const newMenus = [
    {
      name: t('VideoTabBar.home'),
      link: VideoRoutes.home,
      icon: 'fas fa-home',
      hideOnDesktop: true,
    },
    ...menus,
    {
      name: t('VideoTabBar.history'),
      link: VideoRoutes.history,
      icon: 'fas fa-history',
    },
  ];

  const desktopProps: NavigationProps = {
    title: 'HyunVideo',
    menus: newMenus,
  };

  return <CommonNavigation {...desktopProps} />;
}
