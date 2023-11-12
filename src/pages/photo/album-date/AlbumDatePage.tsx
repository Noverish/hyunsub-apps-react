import { useParams } from 'react-router-dom';

import AlbumPhotoMetadataListContainer from '../album-detail/components/AlbumPhotoMetadataListContainer';
import albumDetailApi from 'src/api/photo/album-detail';
import CommonContainer from 'src/components/common/header/CommonContainer';
import PhotoListMobileHeader from 'src/components/photo/photo-list/PhotoListMobileHeader';
import { AlbumDetailProvider } from 'src/pages/photo/album-detail/AlbumDetailContext';

export default function AlbumDatePage() {
  const albumId = useParams().albumId!!;
  const album = albumDetailApi.useApi({ albumId });

  return (
    <AlbumDetailProvider value={album}>
      <div className="AlbumDatePage">
        <PhotoListMobileHeader album={album} />
        <CommonContainer>{albumId}</CommonContainer>
        <AlbumPhotoMetadataListContainer />
      </div>
    </AlbumDetailProvider>
  );
}
