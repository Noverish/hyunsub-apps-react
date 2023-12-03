import { t } from 'i18next';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import PhotoRoutes from '../PhotoRoutes';
import AlbumDetailHooks from './AlbumDetailHooks';
import { useFlattenPageData } from 'src/api/generate-infinite-query';
import albumDetailApi from 'src/api/photo/album-detail';
import albumPhotosApi from 'src/api/photo/album-photos';
import ListLoadingIndicator from 'src/components/common/ListLoadingIndicator';
import { Loading } from 'src/components/common/LoadingSuspense';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import AlbumSelectModal from 'src/components/photo/modal/AlbumSelectModal';
import { useAlbumPhotoRegister } from 'src/components/photo/photo-list/PhotoListHooks';
import PhotoListView from 'src/components/photo/photo-list/PhotoListView';
import { PhotoSelectContext, PhotoSelectProvider } from 'src/components/photo/photo-list/PhotoSelectContext';
import PhotoSelectHeaderHooks from 'src/components/photo/photo-list/PhotoSelectHeaderHooks';
import useScrollBottom from 'src/hooks/scroll-bottom';
import { PhotoPreview } from 'src/model/photo';
import CommonRoutes from 'src/pages/common/CommonRoutes';

import './AlbumDetailPage.scss';

function AlbumDetailPage() {
  const { albumId } = AlbumDetailHooks.usePageParams();

  // hooks
  const { data: album, isLoading } = albumDetailApi.useApiResult({ albumId });
  const { data, fetchNextPage, isFetching } = albumPhotosApi.useInfiniteApi({ albumId }, { suspense: false });
  const photos = useFlattenPageData(data);
  const [state, setState] = useContext(PhotoSelectContext);
  const albumPhotoRegister = useAlbumPhotoRegister();

  useScrollBottom(() => {
    if (!isFetching) {
      fetchNextPage();
    }
  });

  const headerProps = PhotoSelectHeaderHooks.useHeaderProps(photos, album ?? undefined);

  const itemHref = (v: PhotoPreview) => PhotoRoutes.albumViewer({ albumId, photoId: v.id });

  let content = <></>;
  if (isLoading) {
    content = <Loading />;
  } else if (!album) {
    content = <Navigate to={CommonRoutes.notFound} replace />;
  } else {
    content = (
      <>
        <div className="photo_num">{t('photo.page.album-detail.photo-num', [album?.photos?.total])}</div>
        <PhotoListView photos={photos} itemHref={itemHref} />
        <ListLoadingIndicator isFetching={isFetching} />
        <AlbumSelectModal
          show={state.showAlbumSelectModal}
          onHide={() => setState({ showAlbumSelectModal: false })}
          onClick={albumPhotoRegister}
        />
      </>
    );
  }

  return (
    <CommonLayout className="AlbumDetailPage" {...headerProps}>
      {content}
    </CommonLayout>
  );
}

export default function AlbumDetailIndex() {
  return (
    <PhotoSelectProvider>
      <AlbumDetailPage />
    </PhotoSelectProvider>
  );
}
