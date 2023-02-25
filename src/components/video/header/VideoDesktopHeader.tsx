import { t } from 'i18next';
import getCategories from 'src/api/video/category';
import DesktopHeader, { DesktopHeaderProps } from 'src/components/common/header/DesktopHeader';
import router from 'src/pages/router';
import VideoRoutes from 'src/pages/video/VideoRoutes';

export default function VideoDesktopHeader() {
  const { data } = getCategories.useApiResult({});
  const categories = data || [];

  const menus = categories.map(v => ({
    name: v.displayName,
    icon: v.iconHtmlClass,
    link: VideoRoutes.listRoute(v.name),
  }));

  const desktopProps: DesktopHeaderProps = {
    title: 'HyunVideo',
    menus,
    dropdowns: [
      {
        name: t('VideoTabBar.history'),
        link: VideoRoutes.history,
      }
    ],
    onSearch: () => {
      router.navigate(VideoRoutes.search);
    },
  }

  return <DesktopHeader {...desktopProps} />
}
