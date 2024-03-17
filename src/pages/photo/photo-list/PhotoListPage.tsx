import PhotoRoutes from '../PhotoRoutes';
import { PhotoListProvider } from './PhotoListContext';
import PhotoListHooks from './PhotoListHooks';
import PhotoSearchModal from './components/PhotoSearchModal';
import { useFlattenPageData } from 'src/api/generate-infinite-query';
import photoSearchApi from 'src/api/photo/photo-search';
import ListLoadingIndicator from 'src/components/common/ListLoadingIndicator';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import AlbumPhotoRegisterSelectModal from 'src/components/photo/photo-list/AlbumPhotoRegisterSelectModal';
import PhotoListView from 'src/components/photo/photo-list/PhotoListView';
import { PhotoSelectProvider } from 'src/components/photo/photo-list/PhotoSelectContext';
import useScrollBottom from 'src/hooks/scroll-bottom';
import { PhotoPreview } from 'src/model/photo';
import PhotoSearchStatus from 'src/pages/photo/photo-list/components/PhotoSearchStatus';

function PhotoListPage() {
  // hooks
  const searchParams = PhotoListHooks.useSearchParams();
  const { data, fetchNextPage, isFetching } = photoSearchApi.useInfiniteApi(searchParams);
  const photos = useFlattenPageData(data);

  useScrollBottom(() => {
    if (!isFetching) {
      fetchNextPage();
    }
  });

  const headerProps = PhotoListHooks.useHeaderProps();

  const itemHref = (v: PhotoPreview) => PhotoRoutes.photoViewer({ photoId: v.id });

  return (
    <CommonLayout className="PhotoListPage" {...headerProps}>
      <PhotoSearchStatus />
      <PhotoListView photos={photos} itemHref={itemHref} />
      <ListLoadingIndicator isFetching={isFetching} />
      <AlbumPhotoRegisterSelectModal />
    </CommonLayout>
  );
}

export default function PhotoListIndex() {
  return (
    <PhotoSelectProvider>
      <PhotoListProvider>
        <PhotoListPage />
        <PhotoSearchModal />
      </PhotoListProvider>
    </PhotoSelectProvider>
  );
}
