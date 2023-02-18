import { useTranslation } from 'react-i18next';
import ComicRoutes from 'src/pages/comic/ComicRoutes';
import { isMobile } from 'src/utils/user-agent';
import DesktopHeader, { DesktopHeaderProps } from '../common/header/DesktopHeader';
import MobileHeader, { MobileHeaderProps } from '../common/header/MobileHeader';

export default function ComicHeader(props: MobileHeaderProps) {
  const { t } = useTranslation();

  const desktopProps: DesktopHeaderProps = {
    title: 'HyunComic',
    menus: [
      {
        name: 'Albums',
        link: ComicRoutes.list,
        icon: 'fas fa-book',
      },
      {
        name: 'Comics',
        link: ComicRoutes.list,
        icon: 'fas fa-images',
      },
    ],
    dropdowns: [
      {
        name: t('setting'),
        link: ComicRoutes.list,
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
