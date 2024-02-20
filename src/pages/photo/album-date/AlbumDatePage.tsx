import AlbumDateHooks from './AlbumDateHooks';
import albumPhotoMetadataApi from 'src/api/photo/album-photo-metadata';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import PhotoMetadataListView from 'src/components/photo/PhotoMetadataListView';

export default function AlbumDatePage() {
  const { albumId } = AlbumDateHooks.usePageParams();

  const { data: list } = albumPhotoMetadataApi.useApiResult({ albumId });

  const containerOutside = <PhotoMetadataListView list={list ?? []} />;

  return <CommonLayout className="AlbumDatePage" title="AlbumDatePage" containerOutside={containerOutside} />;
}
