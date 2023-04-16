import { t } from "i18next";
import { useParams } from "react-router-dom";
import ListLoadingIndicator from 'src/components/common/ListLoadingIndicator';
import CommonContainer from 'src/components/common/header/CommonContainer';
import PhotoListView from 'src/components/photo/photo-list/PhotoListView';
import PhotoSelectActionModal from 'src/components/photo/photo-list/PhotoSelectActionModal';
import { PhotoSelectProvider } from 'src/components/photo/photo-list/PhotoSelectContext';
import { useBreakpointMobile } from "src/utils/breakpoint";
import { setDocumentTitle } from 'src/utils/services';
import PhotoRoutes from "../PhotoRoutes";
import { AlbumDetailProvider } from "./AlbumDetailContext";
import { useAlbumDetailPage } from "./AlbumDetailHooks";
import AlbumDetailPageMobileHeader from "./component/AlbumDetailPageMobileHeader";

import './AlbumDetailPage.scss';

function AlbumDetailPage() {
  // hooks
  const { album, photos, isFetching } = useAlbumDetailPage();
  const isMobile = useBreakpointMobile();
  setDocumentTitle(t('photo.page.album-detail.title', [album.name]));

  const albumId = album.id;
  const total = album.photos.total;

  // elements
  const titleSectionForDesktop = (
    <section className="title_section">
      <div className="album_name">{album.name}</div>
      <div className="photo_num">{t('photo.page.album-detail.photo-num', [total])}</div>
    </section>
  )

  const titleSectionForMobile = (
    <h2>{t('photo.page.album-detail.photo-num', [total])}</h2>
  )

  return (
    <div className="AlbumDetailPage">
      <AlbumDetailPageMobileHeader />
      <CommonContainer>
        {isMobile ? titleSectionForMobile : titleSectionForDesktop}
        <PhotoListView
          albumId={albumId}
          previews={photos}
          itemHref={(v) => PhotoRoutes.albumViewer(albumId, v.id)}
        />
        <ListLoadingIndicator isFetching={isFetching} />
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
