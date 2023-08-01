import { t } from 'i18next';
import { useContext } from 'react';
import { Button, Row } from 'react-bootstrap';

import PhotoRoutes from '../PhotoRoutes';
import { AlbumListContext, AlbumListProvider } from './AlbumListContext';
import { useAlbumCreate } from './AlbumListHooks';
import { AlbumCreateParams } from 'src/api/photo/album-create';
import albumListApi from 'src/api/photo/album-list';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import { MobileHeaderButton } from 'src/components/common/header/MobileHeader';
import AlbumPreviewView from 'src/components/photo/AlbumPreviewView';
import AlbumCreateModal from 'src/components/photo/modal/AlbumCreateModal';
import { useBreakpointMobile } from 'src/utils/breakpoint';
import { setDocumentTitle } from 'src/utils/services';

function AlbumListPage() {
  setDocumentTitle(t('photo.page.album-list.title'));

  // hooks
  const [state, setState] = useContext(AlbumListContext);
  const { infiniteData: albums } = albumListApi.useInfiniteApi({});
  const albumCreate = useAlbumCreate();
  const isMobile = useBreakpointMobile();

  // functions
  const albumCreateModalCallback = async (params?: AlbumCreateParams) => {
    if (params) {
      await albumCreate(params);
    }
    setState({ showAlbumCreateModal: false });
  };

  const showAlbumCreateModal = () => setState({ showAlbumCreateModal: true });

  // elements
  const elements = albums.map((v) => (
    <AlbumPreviewView key={v.id} preview={v} onClick={PhotoRoutes.albumDetail(v.id)} />
  ));

  const headerBtns: MobileHeaderButton[] = [
    {
      icon: 'fas fa-plus',
      onClick: showAlbumCreateModal,
    },
  ];

  const topBtns = (
    <div className="mb-3">
      <Button onClick={showAlbumCreateModal}>{t('AlbumCreateModal.title')}</Button>
    </div>
  );

  return (
    <div className="AlbumListPage">
      <MobileHeader title={t('photo.page.album-list.title')} btns={headerBtns} />
      <CommonContainer noContainer={isMobile}>
        {isMobile || topBtns}
        <Row className="g-2 row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6">{elements}</Row>
      </CommonContainer>
      <AlbumCreateModal show={state.showAlbumCreateModal} callback={albumCreateModalCallback} />
    </div>
  );
}

export default function AlbumListIndex() {
  return (
    <AlbumListProvider>
      <AlbumListPage />
    </AlbumListProvider>
  );
}
