import { t } from "i18next";
import { useParams } from "react-router-dom";
import albumDetailV2Api from "src/api/photo/album-detail-v2";
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import { PhotoSelectProvider, PhotoSelectContext } from 'src/components/photo/photo-list/PhotoSelectContext';
import PhotoListView from 'src/components/photo/photo-list/PhotoListView';
import { useBreakpointMobile } from "src/utils/breakpoint";
import { useContext } from 'react';
import { MobileHeaderButton } from 'src/components/common/header/MobileHeader';
import { useToggleSelectMode } from 'src/components/photo/photo-list/PhotoListHooks';
import PhotoRoutes from "../PhotoRoutes";

function AlbumDetail2Page() {
  const albumId = useParams().albumId!!;
  const isMobile = useBreakpointMobile();

  const album = albumDetailV2Api.useApi({ albumId });

  const [{ selectMode }] = useContext(PhotoSelectContext);
  const toggleSelectMode = useToggleSelectMode();

  const headerBtns: MobileHeaderButton[] = [
    {
      text: selectMode ? t('cancel') : t('select'),
      onClick: () => toggleSelectMode(),
    }
  ]

  return (
    <div className="AlbumDetail2Page">
      <MobileHeader title={album.name} back btns={headerBtns} />
      <CommonContainer>
        {isMobile || <h1>{album.name}</h1>}
        {isMobile || <hr />}
        <h2>{t('photo.page.album-detail.photo-num', [album.photos.length])}</h2>
        <PhotoListView previews={album.photos} itemHref={(v) => PhotoRoutes.albumViewer2(albumId, v.id)}/>
      </CommonContainer>
    </div>
  )
}

export default function AlbumDetailIndex() {
  return (
    <PhotoSelectProvider>
      <AlbumDetail2Page />
    </PhotoSelectProvider>
  )
}
