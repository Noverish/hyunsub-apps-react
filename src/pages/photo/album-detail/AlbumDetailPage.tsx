import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import PhotoRoutes from '../PhotoRoutes';
import { AlbumDetailContext, AlbumDetailProvider } from './AlbumDetailContext';
import AlbumDetailHooks from './AlbumDetailHooks';
import AlbumInfoView from './components/AlbumInfoView';
import SearchOptionList from './components/SearchOptionList';
import { useFlattenPageData, useTotal } from 'src/api/generate-infinite-query';
import albumDetailApi from 'src/api/photo/album-detail';
import albumPhotosApi from 'src/api/photo/album-photos';
import ListLoadingIndicator from 'src/components/common/ListLoadingIndicator';
import { Loading } from 'src/components/common/LoadingSuspense';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import AlbumPhotoRegisterSelectModal from 'src/components/photo/photo-list/AlbumPhotoRegisterSelectModal';
import PhotoListView from 'src/components/photo/photo-list/PhotoListView';
import { PhotoSelectProvider } from 'src/components/photo/photo-list/PhotoSelectContext';
import useScrollBottom from 'src/hooks/scroll-bottom';
import { PhotoPreview } from 'src/model/photo';
import CommonRoutes from 'src/pages/common/CommonRoutes';
import AlbumPhotoSearchModal from 'src/pages/photo/album-detail/components/AlbumPhotoSearchModal';

import './AlbumDetailPage.scss';

function AlbumDetailPage() {
  const { albumId } = AlbumDetailHooks.usePageParams();

  // hooks
  const [state, setState] = useContext(AlbumDetailContext);
  const photoSearchParams = state.photoSearchParams;

  const { data: album, isLoading } = albumDetailApi.useApiResult({ albumId });
  const { data, fetchNextPage, isFetching } = albumPhotosApi.useInfiniteApi(
    { albumId, ...photoSearchParams },
    { suspense: false },
  );
  const photos = useFlattenPageData(data);
  const total = useTotal(data);

  useScrollBottom(() => {
    if (!isFetching) {
      fetchNextPage();
    }
  });

  const onSearch = () => setState({ showSearchModal: true });

  const headerProps = AlbumDetailHooks.useHeaderProps(photos, album ?? undefined, onSearch);

  const itemHref = (v: PhotoPreview) => PhotoRoutes.albumViewer({ albumId, photoId: v.id });

  let content = <></>;
  if (isLoading) {
    content = <Loading />;
  } else if (!album) {
    content = <Navigate to={CommonRoutes.notFound} replace />;
  } else {
    content = (
      <div className="d-grid gap-3">
        <AlbumInfoView album={album} total={total} />
        <SearchOptionList members={album.members} />
        <PhotoListView photos={photos} itemHref={itemHref} />
        <ListLoadingIndicator isFetching={isFetching} />
        <AlbumPhotoRegisterSelectModal />
        <AlbumPhotoSearchModal members={album.members} />
      </div>
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
      <AlbumDetailProvider>
        <AlbumDetailPage />
      </AlbumDetailProvider>
    </PhotoSelectProvider>
  );
}
