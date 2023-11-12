import PhotoOriginalHooks from './PhotoOriginalHooks';
import photoDetailApi from 'src/api/photo/photo-detail';
import CommonImagePage from 'src/pages/common/CommonImagePage';

export default function PhotoOriginalPage() {
  const { photoId, albumId } = PhotoOriginalHooks.usePageParams();

  const photo = photoDetailApi.useApiResult({ photoId, albumId }).data;

  return <CommonImagePage src={photo?.original} alt={photo?.fileName} />;
}
