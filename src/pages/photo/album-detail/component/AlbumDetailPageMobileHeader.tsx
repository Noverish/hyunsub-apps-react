import { t } from 'i18next';
import { useContext } from 'react';
import MobileHeader, { MobileHeaderButton } from 'src/components/common/header/MobileHeader';
import { useToggleSelectMode } from 'src/components/photo/photo-list/PhotoListHooks';
import { PhotoSelectContext } from 'src/components/photo/photo-list/PhotoSelectContext';
import PhotoRoutes from 'src/pages/photo/PhotoRoutes';
import { useAlbumDetailContext } from 'src/pages/photo/album-detail/AlbumDetailContext';
import router from 'src/pages/router';

export default function AlbumDetailPageMobileHeader() {
  // hooks
  const [{ selectMode, selects }, setPhotoSelectState] = useContext(PhotoSelectContext);
  const album = useAlbumDetailContext();
  const toggleSelectMode = useToggleSelectMode();

  // functions
  const navigateAlbumUpload = () => {
    router.navigate(PhotoRoutes.albumUpload(album.id))
  }

  // elements
  const normalBtns: MobileHeaderButton[] = [
    {
      icon: 'fas fa-plus',
      onClick: navigateAlbumUpload,
    },
    {
      icon: 'far fa-check-circle',
      onClick: toggleSelectMode,
    }
  ]

  const selectBtns: MobileHeaderButton[] = [
    {
      icon: 'fas fa-ellipsis-h',
      onClick: () => setPhotoSelectState({ showSelectActionModal: true }),
    }
  ]

  const title = selectMode
    ? t('n-selected', [selects.length])
    : album.name;

  return (
    <MobileHeader
      title={title}
      back={!selectMode}
      onClose={selectMode ? toggleSelectMode : undefined}
      btns={selectMode ? selectBtns : normalBtns}
    />
  )
}
