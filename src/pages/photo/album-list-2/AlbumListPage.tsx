import { Row } from "react-bootstrap";
import albumListV2Api from "src/api/photo/album-list-v2"
import CommonContainer from "src/components/common/header/CommonContainer";
import MobileHeader from "src/components/common/header/MobileHeader";
import AlbumPreviewView from "src/components/photo/AlbumPreviewView";
import PhotoRoutes from "../PhotoRoutes";
import { setDocumentTitle } from 'src/utils/services';
import { t } from "i18next";
import { MobileHeaderButton } from 'src/components/common/header/MobileHeader';
import { AlbumListContext, AlbumListProvider } from "./AlbumListContext";
import { useContext } from "react";
import AlbumCreateModal from "src/components/photo/modal/AlbumCreateModal";
import { AlbumCreateParams } from "src/api/photo/album-create";
import { useAlbumCreate } from "./AlbumListHooks";

function AlbumListPage() {
  setDocumentTitle(t('photo.page.album-list.title'));

  // hooks
  const [state, setState] = useContext(AlbumListContext);
  const albums = albumListV2Api.useApi({});
  const albumCreate = useAlbumCreate();

  // functions
  const albumCreateModalCallback = async (params?: AlbumCreateParams) => {
    if (params) {
      await albumCreate(params);
    }
    setState({ showAlbumCreateModal: false });
  }

  // elements
  const elements = albums.map(v => (
    <AlbumPreviewView key={v.id} preview={v} onClick={PhotoRoutes.albumDetail2(v.id)} />
  ));

  const headerBtns: MobileHeaderButton[] = [
    {
      icon: 'fas fa-plus',
      onClick: () => setState({ showAlbumCreateModal: true }),
    }
  ]

  return (
    <div className="AlbumList2Page">
      <MobileHeader title={t('photo.page.album-list.title')} btns={headerBtns} />
      <CommonContainer>
        <Row className="g-2 row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6">
          {elements}
        </Row>
      </CommonContainer>
      <AlbumCreateModal show={state.showAlbumCreateModal} callback={albumCreateModalCallback} />
    </div>
  )
}

export default function AlbumListIndex() {
  return (
    <AlbumListProvider>
      <AlbumListPage />
    </AlbumListProvider>
  )
}
