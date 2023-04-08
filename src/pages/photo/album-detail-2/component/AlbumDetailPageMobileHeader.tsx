import MobileHeader from 'src/components/common/header/MobileHeader';
import { useContext } from 'react';
import { PhotoSelectContext } from 'src/components/photo/photo-list/PhotoSelectContext';
import { AlbumDetailContext } from 'src/pages/photo/album-detail-2/AlbumDetailContext';
import albumDetailV2Api from 'src/api/photo/album-detail-v2';
import { MobileHeaderButton } from 'src/components/common/header/MobileHeader';
import router from 'src/pages/router';
import PhotoRoutes from 'src/pages/photo/PhotoRoutes';
import { useToggleSelectMode } from 'src/components/photo/photo-list/PhotoListHooks';
import { t } from 'i18next';

export default function AlbumDetailPageMobileHeader() {
  // hooks
  const [{ selectMode, selects }, setPhotoSelectState] = useContext(PhotoSelectContext);
  const [{ albumId }] = useContext(AlbumDetailContext);
  const album = albumDetailV2Api.useApi({ albumId });
  const toggleSelectMode = useToggleSelectMode();

  // functions
  const navigateAlbumUpload = () => {
    router.navigate(PhotoRoutes.albumUpload2(albumId))
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
