import { t } from "i18next";
import { useContext } from 'react';
import { useParams } from "react-router-dom";
import albumDetailV2Api from "src/api/photo/album-detail-v2";
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader, { MobileHeaderButton } from 'src/components/common/header/MobileHeader';
import PhotoListView from 'src/components/photo/photo-list/PhotoListView';
import { PhotoSelectProvider } from 'src/components/photo/photo-list/PhotoSelectContext';
import router from "src/pages/router";
import { useBreakpointMobile } from "src/utils/breakpoint";
import { setDocumentTitle } from 'src/utils/services';
import PhotoRoutes from "../PhotoRoutes";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { AlbumDetailContext, AlbumDetailProvider } from "./AlbumDetailContext";
import AlbumPhotoMetadataListContainer from "./component/AlbumPhotoMetadataListContainer";

import './AlbumDetailPage.scss';

function AlbumDetailPage() {
  // hooks
  const [{ albumId, mode }, setAlbumDetailState] = useContext(AlbumDetailContext);
  const isMobile = useBreakpointMobile();
  const album = albumDetailV2Api.useApi({ albumId });
  setDocumentTitle(t('photo.page.album-detail.title', [album.name]));

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
        <h2 className="photo_num">{t('photo.page.album-detail.photo-num', [album.photos.length])}</h2>
        <DropdownButton title="보기">
          <Dropdown.Item onClick={() => setAlbumDetailState({ mode: 'photo' })}>사진 보기</Dropdown.Item>
          <Dropdown.Item onClick={() => setAlbumDetailState({ mode: 'metadata' })}>정보 보기</Dropdown.Item>
        </DropdownButton>
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

  const photoImageList = (
    <PhotoListView previews={album.photos} itemHref={(v) => PhotoRoutes.albumViewer2(albumId, v.id)} />
  )

  const photoMetadataList = (
    <AlbumPhotoMetadataListContainer />
  )

  return (
    <div className="AlbumDetailPage">
      <MobileHeader title={album.name} back btns={headerBtns} />
      <CommonContainer>
        {isMobile ? headerForMobile : headerForDesktop}
        {mode === 'photo' && photoImageList}
      </CommonContainer>
      {mode === 'photo' || photoMetadataList}
    </div>
  )
}

export default function AlbumDetailIndex() {
  const albumId = useParams().albumId!!;

  return (
    <AlbumDetailProvider initialState={{ albumId }}>
      <PhotoSelectProvider>
        <AlbumDetailPage />
      </PhotoSelectProvider>
    </AlbumDetailProvider>
  )
}
