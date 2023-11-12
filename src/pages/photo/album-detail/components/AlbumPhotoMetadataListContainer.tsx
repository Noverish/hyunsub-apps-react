import albumPhotoMetadataApi from 'src/api/photo/album-photo-metadata';
import PhotoMetadataListView from 'src/components/photo/PhotoMetadataListView';
import { useAlbumDetailContext } from 'src/pages/photo/album-detail/AlbumDetailContext';

export default function AlbumPhotoMetadataListContainer() {
  // hooks
  const album = useAlbumDetailContext();
  const list = albumPhotoMetadataApi.useApi({ albumId: album.id });

  return <PhotoMetadataListView list={list} />;
}
