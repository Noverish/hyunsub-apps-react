import CommonContainer from 'src/components/common/header/CommonContainer';
import AlbumDetailPageMobileHeader from '../album-detail/component/AlbumDetailPageMobileHeader';
import AlbumPhotoMetadataListContainer from '../album-detail/component/AlbumPhotoMetadataListContainer';
import { useParams } from 'react-router-dom';
import { AlbumDetailProvider } from 'src/pages/photo/album-detail/AlbumDetailContext';
import albumDetailApi from 'src/api/photo/album-detail';

export default function AlbumDatePage() {
  const albumId = useParams().albumId!!;
  const album = albumDetailApi.useApi({ albumId });

  return (
    <AlbumDetailProvider value={album}>
      <div className="AlbumDatePage">
        <AlbumDetailPageMobileHeader />
        <CommonContainer>
          {albumId}
        </CommonContainer>
        <AlbumPhotoMetadataListContainer />
      </div>
    </AlbumDetailProvider>
  )
}
