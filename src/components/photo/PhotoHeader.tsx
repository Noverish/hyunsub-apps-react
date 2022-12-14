import { useTranslation } from 'react-i18next';
import PhotoRoutes from 'src/pages/photo/PhotoRoutes';
import { isMobile } from 'src/utils/user-agent';
import DesktopHeader, { DesktopHeaderProps } from '../common/header/DesktopHeader';
import MobileHeader, { MobileHeaderProps } from '../common/header/MobileHeader';

export default function PhotoHeader(props: MobileHeaderProps) {
  const { t } = useTranslation();

  const desktopProps: DesktopHeaderProps = {
    title: 'HyunPhoto',
    menus: [
      {
        name: 'Albums',
        link: PhotoRoutes.albums,
        icon: 'fas fa-book',
      },
      {
        name: 'Photos',
        link: PhotoRoutes.photos,
        icon: 'fas fa-images',
      },
    ],
    dropdowns: [
      {
        name: t('setting'),
        link: PhotoRoutes.menu,
      }
    ],
    onSearch: () => {
      alert('Not yet implemented');
    },
  }

  if (isMobile()) {
    return <MobileHeader {...props} />
  } else {
    return <DesktopHeader {...desktopProps} />
  }
}
