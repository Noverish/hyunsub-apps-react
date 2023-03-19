import { t } from 'i18next';
import flatten from 'lodash/flatten';
import { useContext } from 'react';
import photoListApi from 'src/api/photo/photo-list';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader, { MobileHeaderButton } from 'src/components/common/header/MobileHeader';
import AlbumSelectModal from 'src/components/photo/AlbumSelectModal';
import PhotoSelectActionModal from 'src/pages/photo/photo-list/components/PhotoSelectActionModal';
import { useScrollBottom } from 'src/utils';
import { setDocumentTitle } from 'src/utils/services';
import PhotoListView from './components/PhotoListView';
import { usePhotoListSelect } from './PhotoListHooks';
import { PhotoListContext, PhotoListProvider } from './PhotoListState';
import { useAlbumPhotoRegister } from 'src/pages/photo/photo-list/PhotoListHooks';

function PhotoListPage() {
  setDocumentTitle(t('photo.page.photo-list.title'));

  const { data, fetchNextPage, isFetching } = photoListApi.useInfiniteApi({});
  const previews = flatten(data?.pages.map(v => v.data) ?? []);

  useScrollBottom(() => {
    if (!isFetching) {
      fetchNextPage();
    }
  });

  const [state, setState] = useContext(PhotoListContext);
  const { selects, selectMode, toggleSelectMode } = usePhotoListSelect(previews);
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
        <PhotoListView previews={previews} />
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
    <PhotoListProvider>
      <PhotoListPage />
    </PhotoListProvider>
  )
}
