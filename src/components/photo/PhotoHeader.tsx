import PhotoRoutes from 'src/pages/photo/PhotoRoutes';
import { Header, HeaderProps } from '../common/header/Header';

export default function PhotoHeader() {
  const props: HeaderProps = {
    title : 'HyunPhoto',
    menus: [
      {
        name: 'Albums',
        link: PhotoRoutes.albumList(),
        iconClass: 'fas fa-book',
      },
      {
        name: 'Photos',
        link: PhotoRoutes.photoList(),
        iconClass: 'fas fa-images',
      },
    ],
    dropdowns: [
      {
        name: 'Setting',
        link: PhotoRoutes.setting(),
      }
    ],
    onSearch: () => {
      alert('Not yet implemented');
    },
  }

  return (
    <Header {...props} />
  )
}
