import { t } from 'i18next';

import videoCategoryApi from 'src/api/video/video-category';
import DesktopHeader, { DesktopHeaderDropdown, DesktopHeaderProps } from 'src/components/common/header/DesktopHeader';
import router from 'src/pages/router';
import VideoRoutes from 'src/pages/video/VideoRoutes';
import { useSelector } from 'src/redux';

export default function VideoDesktopHeader() {
  const { data } = videoCategoryApi.useApiResult({});
  const isAdmin = useSelector((s) => s.global.tokenPayload?.isAdmin);
  const categories = data || [];

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
