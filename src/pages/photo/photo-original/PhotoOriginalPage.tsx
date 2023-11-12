import PhotoOriginalHooks from './PhotoOriginalHooks';
import photoDetailApi from 'src/api/photo/photo-detail';
import { Loading } from 'src/components/common/LoadingSuspense';
import CommonLayout from 'src/components/common/layout/CommonLayout';

export default function PhotoOriginalPage() {
  const { photoId } = PhotoOriginalHooks.usePageParams();

  const { data: photo } = photoDetailApi.useApiResult({ photoId });

  return (
    <CommonLayout className="PhotoOriginalPage" title={photo?.fileName ?? ''} back>
      {photo ? <img className="img-fluid" src={photo.original} alt={photo.fileName} /> : <Loading />}
    </CommonLayout>
  );
}
