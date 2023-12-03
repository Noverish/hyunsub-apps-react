import DiaryViewerHooks from './DiaryViewerHooks';
import diaryDetailPhotosApi from 'src/api/diary/diary-detail-photos';
import { useFlattenPageData } from 'src/api/generate-infinite-query';
import CommonViewerPage from 'src/pages/common/viewer/CommonViewerPage';
import PhotoViewerHooks from 'src/pages/photo/photo-viewer/PhotoViewerHooks';

export default function DiaryViewerPage() {
  const { date, photoId } = DiaryViewerHooks.usePageParams();
  const { data } = diaryDetailPhotosApi.useInfiniteApi({ date }, { suspense: false });
  const photos = useFlattenPageData(data);
  const slides = PhotoViewerHooks.convertData(photos);

  const initialIndex = photos.findIndex((v) => v.id === photoId);

  return <CommonViewerPage slides={slides} initialIndex={initialIndex} />;
}
