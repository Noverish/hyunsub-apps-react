import { t } from 'i18next';
import { useContext } from 'react';
import photoListApi from 'src/api/photo/photo-list';
import ListLoadingIndicator from 'src/components/common/ListLoadingIndicator';
import CommonContainer from 'src/components/common/header/CommonContainer';
import AlbumSelectModal from 'src/components/photo/modal/AlbumSelectModal';
import { useAlbumPhotoRegister } from 'src/components/photo/photo-list/PhotoListHooks';
import PhotoListMobileHeader from 'src/components/photo/photo-list/PhotoListMobileHeader';
import PhotoListView from 'src/components/photo/photo-list/PhotoListView';
import PhotoSelectActionModal from 'src/components/photo/photo-list/PhotoSelectActionModal';
import { PhotoSelectContext, PhotoSelectProvider } from 'src/components/photo/photo-list/PhotoSelectContext';
import useScrollBottom from 'src/hooks/scroll-bottom';
import { setDocumentTitle } from 'src/utils/services';
import PhotoRoutes from '../PhotoRoutes';

function PhotoListPage() {
  setDocumentTitle(t('photo.page.photo-list.title'));

  // hooks
  const { infiniteData, fetchNextPage, isFetching } = photoListApi.useInfiniteApi({});
  const [state, setState] = useContext(PhotoSelectContext);
  const albumPhotoRegister = useAlbumPhotoRegister();

  useScrollBottom(() => {
    if (!isFetching) {
      fetchNextPage();
    }
  });

  return (
    <div id="PhotoListPage">
      <PhotoListMobileHeader />
      <CommonContainer>
        <PhotoListView previews={infiniteData} itemHref={(v) => PhotoRoutes.photoViewer(v.id)} />
        <ListLoadingIndicator isFetching={isFetching} />
      </CommonContainer>
      <PhotoSelectActionModal />
      <AlbumSelectModal
        show={state.showAlbumSelectModal}
        onHide={() => setState({ showAlbumSelectModal: false })}
        onClick={albumPhotoRegister}
      />
    </div>
  )
}

export default function PhotoListIndex() {
  return (
    <PhotoSelectProvider>
      <PhotoListPage />
    </PhotoSelectProvider>
  )
}
