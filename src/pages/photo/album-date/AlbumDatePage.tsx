import albumPhotoMetadataApi from 'src/api/photo/album-photo-metadata';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import PhotoMetadataListView from 'src/components/photo/PhotoMetadataListView';
import { useUrlParams } from 'src/hooks/url-params';

export default function AlbumDatePage() {
  const [albumId] = useUrlParams('albumId');
  const { data: list } = albumPhotoMetadataApi.useApiResult({ albumId });
  const containerOutside = <PhotoMetadataListView list={list ?? []} />;

  return (
    <CommonLayout className="AlbumDatePage" title="AlbumDatePage" containerOutside={containerOutside}>
      <span>albumId</span>
    </CommonLayout>
  );
}
