import { useParams } from 'react-router-dom';
import albumDetailApi from 'src/api/photo/album-detail';
import CommonContainer from 'src/components/common/header/CommonContainer';
import { AlbumDetailProvider } from 'src/pages/photo/album-detail/AlbumDetailContext';
import AlbumPhotoMetadataListContainer from '../album-detail/component/AlbumPhotoMetadataListContainer';
import PhotoListMobileHeader from 'src/components/photo/photo-list/PhotoListMobileHeader';

export default function AlbumDatePage() {
  const albumId = useParams().albumId!!;
  const album = albumDetailApi.useApi({ albumId });

  return (
    <AlbumDetailProvider value={album}>
      <div className="AlbumDatePage">
        <PhotoListMobileHeader album={album} />
        <CommonContainer>
          {albumId}
        </CommonContainer>
        <AlbumPhotoMetadataListContainer />
      </div>
    </AlbumDetailProvider>
  )
}
