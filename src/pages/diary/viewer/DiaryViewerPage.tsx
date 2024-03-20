import DiaryViewerHooks from './DiaryViewerHooks';
import diaryDetailPhotosApi from 'src/api/diary/diary-detail-photos';
import { useFlattenPageData } from 'src/api/generate-infinite-query';
import PhotoHooks from 'src/hooks/photo';
import CommonViewerPage from 'src/pages/common/viewer/CommonViewerPage';

export default function DiaryViewerPage() {
  const { date, photoId } = DiaryViewerHooks.usePageParams();
  const { data } = diaryDetailPhotosApi.useInfiniteApi({ date }, { suspense: true });
  const photos = useFlattenPageData(data);

  const initialIndex = photos.findIndex((v) => v.id === photoId);

  return <CommonViewerPage slides={photos} convertSlide={PhotoHooks.convertSlide} initialIndex={initialIndex} />;
}
