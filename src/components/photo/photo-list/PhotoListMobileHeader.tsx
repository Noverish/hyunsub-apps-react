import { t } from 'i18next';
import { useContext } from 'react';
import MobileHeader, { MobileHeaderButton } from 'src/components/common/header/MobileHeader';
import { MobileHeaderMoreButtonMenu } from 'src/components/common/header/MobileHeaderMoreButton';
import { useToggleSelectMode } from 'src/components/photo/photo-list/PhotoListHooks';
import { PhotoSelectContext } from 'src/components/photo/photo-list/PhotoSelectContext';
import { Album } from 'src/model/photo';
import PhotoRoutes from 'src/pages/photo/PhotoRoutes';
import router from 'src/pages/router';

interface Props {
  album?: Album;
}

export default function PhotoListMobileHeader({ album }: Props) {
  // hooks
  const [{ selectMode, selects }, setState] = useContext(PhotoSelectContext);
  const toggleSelectMode = useToggleSelectMode();

  // elements
  const normalBtns: MobileHeaderButton[] = [
    {
      icon: 'far fa-check-circle',
      onClick: toggleSelectMode,
    },
  ]

  const normalMenus: MobileHeaderMoreButtonMenu[] = [
    {
      text: t('upload'),
      onClick: () => {
        album
          ? router.navigate(PhotoRoutes.albumUpload(album.id))
          : router.navigate(PhotoRoutes.photoUpload)
      },
    },
    {
      text: t('filter'),
      onClick: () => { console.log('filter') }
    },
    {
      text: t('sort'),
      onClick: () => { console.log('sort') }
    },
    {
      text: t('view'),
      onClick: () => { console.log('view') }
    },
  ]

  const selectMenus: MobileHeaderMoreButtonMenu[] = [
    {
      text: t('PhotoListView.add-to-album'),
      onClick: () => setState({ showAlbumSelectModal: true }),
    },
    {
      text: t('delete'),
      onClick: () => { console.log('delete') }
    },
  ]

  const title = selectMode
    ? t('n-selected', [selects.length])
    : (album ? album.name : t('photo.page.photo-list.title'));

  const back = selectMode
    ? false
    : !!album;

  return (
    <MobileHeader
      title={title}
      back={back}
      onClose={selectMode ? toggleSelectMode : undefined}
      btns={selectMode ? undefined : normalBtns}
      menus={selectMode ? selectMenus : normalMenus}
    />
  )
}