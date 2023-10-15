import { t } from 'i18next';
import { useContext } from 'react';

import DesktopHeader, { DesktopHeaderDropdown, DesktopHeaderProps } from 'src/components/common/header/DesktopHeader';
import { VideoCategoryContext } from 'src/context/video/VideoCategoryContext';
import { useIsAdmin } from 'src/hooks/token';
import router from 'src/pages/router';
import VideoRoutes from 'src/pages/video/VideoRoutes';

export default function VideoDesktopHeader() {
  const categories = useContext(VideoCategoryContext);
  const isAdmin = useIsAdmin();

  const menus = categories.map((v) => ({
    name: v.displayName,
    icon: v.iconHtmlClass,
    link: VideoRoutes.list(v.name),
  }));

  const dropdowns: DesktopHeaderDropdown[] = [
    {
      name: t('VideoTabBar.history'),
      link: VideoRoutes.history,
    },
  ];

  if (isAdmin) {
    dropdowns.push({
      name: 'Admin',
      link: VideoRoutes.admin,
    });
  }

  const desktopProps: DesktopHeaderProps = {
    title: 'HyunVideo',
    menus,
    dropdowns,
    onSearch: () => {
      router.navigate(VideoRoutes.search);
    },
  };

  return <DesktopHeader {...desktopProps} />;
}
