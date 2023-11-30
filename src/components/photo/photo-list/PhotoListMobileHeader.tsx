import { t } from 'i18next';
import { useContext } from 'react';

import MobileHeader, { HeaderButton } from 'src/components/common/header/MobileHeader';
import { MobileHeaderMoreButtonMenu } from 'src/components/common/header/MobileHeaderMoreButton';
import { useAlbumThumbnailRegister, useToggleSelectMode } from 'src/components/photo/photo-list/PhotoListHooks';
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
  const registerThumbnail = useAlbumThumbnailRegister(album?.id);

  // elements
  const normalBtns: HeaderButton[] = [
    {
      icon: 'far fa-check-circle',
      onClick: toggleSelectMode,
    },
  ];

  const normalMenus: MobileHeaderMoreButtonMenu[] = [
    {
      text: t('upload'),
      onClick: () => {
        album ? router.navigate(PhotoRoutes.albumUpload(album.id)) : router.navigate(PhotoRoutes.photoUpload);
      },
    },
    {
      text: t('filter'),
      onClick: () => {
        alert('Not yet supported!');
      },
    },
    {
      text: t('sort'),
      onClick: () => {
        alert('Not yet supported!');
      },
    },
    {
      text: t('view'),
      onClick: () => {
        alert('Not yet supported!');
      },
    },
  ];

  const selectMenus: MobileHeaderMoreButtonMenu[] = [
    {
      text: t('PhotoListView.add-to-album'),
      onClick: () => setState({ showAlbumSelectModal: true }),
    },
    {
      text: t('delete'),
      onClick: () => {
        alert('Not yet supported!');
      },
    },
  ];

  if (registerThumbnail) {
    selectMenus.push({
      text: t('photo.register-thumbnail'),
      onClick: registerThumbnail,
    });
  }

  const title = selectMode ? t('n-selected', [selects.length]) : album ? album.name : t('photo.page.photo-list.title');

  const back = selectMode ? false : !!album;

  return (
    <MobileHeader
      title={title}
      back={back}
      onClose={selectMode ? toggleSelectMode : undefined}
      btns={selectMode ? undefined : normalBtns}
      menus={selectMode ? selectMenus : normalMenus}
    />
  );
}
