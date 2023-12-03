import DiaryPhotoHooks from './DiaryPhotoHooks';
import diaryDetailPhotosApi from 'src/api/diary/diary-detail-photos';
import { useFlattenPageData } from 'src/api/generate-infinite-query';
import CommonViewerPage from 'src/pages/common/viewer/CommonViewerPage';
import PhotoViewerHooks from 'src/pages/photo/photo-viewer/PhotoViewerHooks';

export default function DiaryPhotoPage() {
  const { date, photoId } = DiaryPhotoHooks.usePageParams();
  const { data } = diaryDetailPhotosApi.useInfiniteApi({ date }, { suspense: false });
  const infiniteData = useFlattenPageData(data);
  const slides = PhotoViewerHooks.convertData(infiniteData);

  const initialIndex = infiniteData.findIndex((v) => v.id === photoId);

  return <CommonViewerPage slides={slides} initialIndex={initialIndex} />;
}
