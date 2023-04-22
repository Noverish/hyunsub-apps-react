import { t } from 'i18next';
import flatten from 'lodash/flatten';
import { useContext } from 'react';
import photoListApi from 'src/api/photo/photo-list';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader, { MobileHeaderButton } from 'src/components/common/header/MobileHeader';
import AlbumSelectModal from 'src/components/photo/modal/AlbumSelectModal';
import { PhotoSelectContext, PhotoSelectProvider } from 'src/components/photo/photo-list/PhotoSelectContext';
import { useAlbumPhotoRegister, usePhotoListSelect, useToggleSelectMode } from 'src/components/photo/photo-list/PhotoListHooks';
import PhotoListView from 'src/components/photo/photo-list/PhotoListView';
import PhotoSelectActionModal from 'src/components/photo/photo-list/PhotoSelectActionModal';
import useScrollBottom from 'src/hooks/scroll-bottom';
import { setDocumentTitle } from 'src/utils/services';
import PhotoRoutes from '../PhotoRoutes';
import ListLoadingIndicator from 'src/components/common/ListLoadingIndicator';

function PhotoListPage() {
  setDocumentTitle(t('photo.page.photo-list.title'));

  const { data, fetchNextPage, isFetching } = photoListApi.useInfiniteApi({});
  const previews = flatten(data?.pages.map(v => v.data) ?? []);

  useScrollBottom(() => {
    if (!isFetching) {
      fetchNextPage();
    }
  });

  const [state, setState] = useContext(PhotoSelectContext);
  const toggleSelectMode = useToggleSelectMode();
  const { selects, selectMode } = usePhotoListSelect(previews);
  const title = selectMode ? t('n-selected', [selects.length]) : 'Photos';

  const albumPhotoRegister = useAlbumPhotoRegister();

  const headerBtns: MobileHeaderButton[] = [
    {
      text: selectMode ? t('cancel') : t('select'),
      onClick: () => toggleSelectMode(),
    }
  ]

  if (selectMode) {
    headerBtns.push({
      icon: 'fas fa-ellipsis-h',
      onClick: () => setState({ showSelectActionModal: true }),
    })
  }

  return (
    <div id="PhotoListPage">
      <MobileHeader title={title} btns={headerBtns} />
      <CommonContainer>
        <PhotoListView previews={previews} itemHref={(v) => PhotoRoutes.photoViewer(v.id)} />
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
