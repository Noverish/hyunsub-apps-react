import { useContext } from 'react';
import albumPhotoMetadataApi from 'src/api/photo/album-photo-metadata';
import PhotoMetadataListView from 'src/components/photo/PhotoMetadataListView';
import { AlbumDetailContext } from 'src/pages/photo/album-detail-2/AlbumDetailContext';

export default function AlbumPhotoMetadataListContainer() {
  // hooks
  const [{ albumId }] = useContext(AlbumDetailContext);
  const list = albumPhotoMetadataApi.useApi({ albumId });

  return (
    <PhotoMetadataListView list={list} />
  )
}
