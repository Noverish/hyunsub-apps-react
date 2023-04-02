import { t } from "i18next";
import { useParams } from "react-router-dom";
import albumDetailV2Api from "src/api/photo/album-detail-v2";
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import { PhotoSelectProvider, PhotoSelectContext } from 'src/components/photo/photo-list/PhotoSelectContext';
import PhotoListView from 'src/components/photo/photo-list/PhotoListView';
import { useBreakpointMobile } from "src/utils/breakpoint";
import { useContext } from 'react';
import { MobileHeaderButton } from 'src/components/common/header/MobileHeader';
import { useToggleSelectMode } from 'src/components/photo/photo-list/PhotoListHooks';
import PhotoRoutes from "../PhotoRoutes";
import { setDocumentTitle } from 'src/utils/services';
import router from "src/pages/router";

import './AlbumDetailPage.scss';
import { Button } from "react-bootstrap";

function AlbumDetailPage() {
  // hooks
  const albumId = useParams().albumId!!;
  const isMobile = useBreakpointMobile();
  const album = albumDetailV2Api.useApi({ albumId });
  setDocumentTitle(t('photo.page.album-detail.title', [album.name]));

  const [{ selectMode }] = useContext(PhotoSelectContext);
  const toggleSelectMode = useToggleSelectMode();

  // functions
  const navigateAlbumUpload = () => {
    router.navigate(PhotoRoutes.albumUpload2(albumId))
  }

  // elements
  const headerBtns: MobileHeaderButton[] = [
    {
      icon: 'fas fa-upload',
      onClick: navigateAlbumUpload,
    }
  ]

  const headerForDesktop = (
    <div>
      <h1>{album.name}</h1>
      <div className="btn_container">
        <h2>{t('photo.page.album-detail.photo-num', [album.photos.length])}</h2>
        <Button onClick={navigateAlbumUpload}>{t('upload')}</Button>
      </div>
      <hr />
    </div>
  )

  const headerForMobile = (
    <div className="headerForMobile">
      <h2>{t('photo.page.album-detail.photo-num', [album.photos.length])}</h2>
    </div>
  )

  return (
    <div className="AlbumDetailPage">
      <MobileHeader title={album.name} back btns={headerBtns} />
      <CommonContainer>
        {isMobile ? headerForMobile : headerForDesktop}
        <PhotoListView previews={album.photos} itemHref={(v) => PhotoRoutes.albumViewer2(albumId, v.id)} />
      </CommonContainer>
    </div>
  )
}

export default function AlbumDetailIndex() {
  return (
    <PhotoSelectProvider>
      <AlbumDetailPage />
    </PhotoSelectProvider>
  )
}
