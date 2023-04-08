import { t } from "i18next";
import { useContext } from 'react';
import { useParams } from "react-router-dom";
import albumDetailV2Api from "src/api/photo/album-detail-v2";
import CommonContainer from 'src/components/common/header/CommonContainer';
import PhotoListView from 'src/components/photo/photo-list/PhotoListView';
import PhotoSelectActionModal from 'src/components/photo/photo-list/PhotoSelectActionModal';
import { PhotoSelectProvider } from 'src/components/photo/photo-list/PhotoSelectContext';
import { useBreakpointMobile } from "src/utils/breakpoint";
import { setDocumentTitle } from 'src/utils/services';
import PhotoRoutes from "../PhotoRoutes";
import { AlbumDetailContext, AlbumDetailProvider } from "./AlbumDetailContext";
import AlbumDetailPageMobileHeader from "./component/AlbumDetailPageMobileHeader";

import './AlbumDetailPage.scss';

function AlbumDetailPage() {
  // hooks
  const [{ albumId }] = useContext(AlbumDetailContext);
  const album = albumDetailV2Api.useApi({ albumId });
  const isMobile = useBreakpointMobile();
  setDocumentTitle(t('photo.page.album-detail.title', [album.name]));

  // elements
  const titleSectionForDesktop = (
    <section className="title_section">
      <div className="album_name">{album.name}</div>
      <div className="photo_num">{t('photo.page.album-detail.photo-num', [album.photos.length])}</div>
    </section>
  )

  const titleSectionForMobile = (
    <h2>{t('photo.page.album-detail.photo-num', [album.photos.length])}</h2>
  )

  const photoImageList = (
    <PhotoListView
      albumId={albumId}
      previews={album.photos}
      itemHref={(v) => PhotoRoutes.albumViewer2(albumId, v.id)}
    />
  )

  return (
    <div className="AlbumDetailPage">
      <AlbumDetailPageMobileHeader />
      <CommonContainer>
        {isMobile ? titleSectionForMobile : titleSectionForDesktop}
        {photoImageList}
      </CommonContainer>
    </div>
  )
}

export default function AlbumDetailIndex() {
  const albumId = useParams().albumId!!;

  return (
    <AlbumDetailProvider initialState={{ albumId }}>
      <PhotoSelectProvider>
        <AlbumDetailPage />
        <PhotoSelectActionModal />
      </PhotoSelectProvider>
    </AlbumDetailProvider>
  )
}
