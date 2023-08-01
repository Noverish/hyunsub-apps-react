import { t } from 'i18next';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import PhotoRoutes from '../PhotoRoutes';
import { AlbumDetailProvider } from './AlbumDetailContext';
import { useAlbumDelete, useAlbumDetailPage } from './AlbumDetailHooks';
import albumDetailApi from 'src/api/photo/album-detail';
import ListLoadingIndicator from 'src/components/common/ListLoadingIndicator';
import CommonContainer from 'src/components/common/header/CommonContainer';
import PhotoListMobileHeader from 'src/components/photo/photo-list/PhotoListMobileHeader';
import PhotoListView from 'src/components/photo/photo-list/PhotoListView';
import { PhotoSelectProvider } from 'src/components/photo/photo-list/PhotoSelectContext';
import { useBreakpointMobile } from 'src/utils/breakpoint';
import { setDocumentTitle } from 'src/utils/services';

import './AlbumDetailPage.scss';

function AlbumDetailPage() {
  // hooks
  const { album, photos, isFetching } = useAlbumDetailPage();
  const isMobile = useBreakpointMobile();
  const albumDelete = useAlbumDelete();
  setDocumentTitle(t('photo.page.album-detail.title', [album.name]));

  const albumId = album.id;
  const total = album.photos.total;

  // elements
  const titleSectionForDesktop = (
    <section className="title_section">
      <div className="album_name">{album.name}</div>
      <div className="photo_num">{t('photo.page.album-detail.photo-num', [total])}</div>
    </section>
  );

  const titleSectionForMobile = <h2>{t('photo.page.album-detail.photo-num', [total])}</h2>;

  const photoListTopRightButton = (
    <Button className="delete_button" variant="danger" onClick={() => albumDelete({ albumId })}>
      {t('AlbumDetailPage.delete-album')}
    </Button>
  );

  return (
    <div className="AlbumDetailPage">
      <PhotoListMobileHeader album={album} />
      <CommonContainer noContainer={isMobile}>
        {isMobile ? titleSectionForMobile : titleSectionForDesktop}
        <PhotoListView
          albumId={albumId}
          previews={photos}
          itemHref={(v) => PhotoRoutes.albumViewer(albumId, v.id)}
          rightBtn={photoListTopRightButton}
        />
        <ListLoadingIndicator isFetching={isFetching} />
      </CommonContainer>
    </div>
  );
}

export default function AlbumDetailIndex() {
  const albumId = useParams().albumId!!;
  const album = albumDetailApi.useApi({ albumId });

  return (
    <AlbumDetailProvider value={album}>
      <PhotoSelectProvider>
        <AlbumDetailPage />
      </PhotoSelectProvider>
    </AlbumDetailProvider>
  );
}
