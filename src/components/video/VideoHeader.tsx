import getCategories from "src/api/video/category";
import { VideoSearchActions } from 'src/pages/video/search/VideoSearchState';
import VideoRoutes from 'src/pages/video/VideoRoutes';
import { useDispatch } from 'src/redux';
import { Header, HeaderProps } from '../common/header/Header';

export default function VideoHeader() {
  const dispatch = useDispatch();

  const categories = getCategories.useApi();

  const menus = categories.map(v => ({
    name: v.displayName,
    iconClass: v.iconHtmlClass,
    link: `/${v.name}`
  }))

  const props: HeaderProps = {
    title : 'HyunPhoto',
    menus: menus,
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
  
  return (
    <Header {...props} />
  )
}
