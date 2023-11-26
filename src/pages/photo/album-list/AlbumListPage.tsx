import { t } from 'i18next';
import { useContext } from 'react';

import PhotoRoutes from '../PhotoRoutes';
import { AlbumListContext, AlbumListProvider } from './AlbumListContext';
import { useFlattenPageData } from 'src/api/generate-infinite-query';
import albumListApi from 'src/api/photo/album-list';
import { MobileHeaderButton } from 'src/components/common/header/MobileHeader';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import AlbumPreviewView from 'src/components/photo/AlbumPreviewView';
import useScrollBottom from 'src/hooks/scroll-bottom';
import AlbumCreateModal from 'src/pages/photo/album-list/components/AlbumCreateModal';

function AlbumListPage() {
  // hooks
  const { data, fetchNextPage, isFetching } = albumListApi.useInfiniteApi({});
  const albums = useFlattenPageData(data);
  const setState = useContext(AlbumListContext)[1];

  useScrollBottom(() => {
    if (!isFetching) {
      fetchNextPage();
    }
  });

  // functions
  const showAlbumCreateModal = () => setState({ showAlbumCreateModal: true });

  // elements
  const elements = albums.map((v) => (
    <AlbumPreviewView key={v.id} preview={v} onClick={PhotoRoutes.albumDetail(v.id)} />
  ));

  const headerBtns: MobileHeaderButton[] = [
    {
      icon: 'fas fa-plus',
      name: t('AlbumCreateModal.title'),
      onClick: showAlbumCreateModal,
    },
  ];

  return (
    <>
      <CommonLayout className="AlbumListPage" title={t('photo.page.album-list.title')} btns={headerBtns}>
        <div className="d-grid gap-2 row-col-2 row-col-md-3 row-col-lg-4 row-col-xl-5 row-col-xxl-6">{elements}</div>
      </CommonLayout>
      <AlbumCreateModal />
    </>
  );
}

export default function AlbumListIndex() {
  return (
    <AlbumListProvider>
      <AlbumListPage />
    </AlbumListProvider>
  );
}
