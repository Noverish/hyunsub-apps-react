import { useContext } from 'react';

import PhotoRoutes from '../PhotoRoutes';
import { useFlattenPagination } from 'src/api/generate-pagination-query';
import photoListApi from 'src/api/photo/photo-list';
import ListLoadingIndicator from 'src/components/common/ListLoadingIndicator';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import AlbumSelectModal from 'src/components/photo/modal/AlbumSelectModal';
import { useAlbumPhotoRegister } from 'src/components/photo/photo-list/PhotoListHooks';
import PhotoListView from 'src/components/photo/photo-list/PhotoListView';
import { PhotoSelectContext, PhotoSelectProvider } from 'src/components/photo/photo-list/PhotoSelectContext';
import PhotoSelectHeaderHooks from 'src/components/photo/photo-list/PhotoSelectHeaderHooks';
import useScrollBottom from 'src/hooks/scroll-bottom';
import { PhotoPreview } from 'src/model/photo';

function PhotoListPage() {
  // hooks
  const { data, fetchNextPage, isFetching } = photoListApi.useInfiniteApi({});
  const photos = useFlattenPagination(data);
  const [state, setState] = useContext(PhotoSelectContext);
  const albumPhotoRegister = useAlbumPhotoRegister();

  useScrollBottom(() => {
    if (!isFetching) {
      fetchNextPage();
    }
  });

  const headerProps = PhotoSelectHeaderHooks.useHeaderProps(photos);

  const itemHref = (v: PhotoPreview) => PhotoRoutes.photoViewer({ photoId: v.id });

  return (
    <CommonLayout className="PhotoListPage" {...headerProps}>
      <PhotoListView photos={photos} itemHref={itemHref} />
      <ListLoadingIndicator isFetching={isFetching} />
      <AlbumSelectModal
        show={state.showAlbumSelectModal}
        onHide={() => setState({ showAlbumSelectModal: false })}
        onClick={albumPhotoRegister}
      />
    </CommonLayout>
  );
}

export default function PhotoListIndex() {
  return (
    <PhotoSelectProvider>
      <PhotoListPage />
    </PhotoSelectProvider>
  );
}
