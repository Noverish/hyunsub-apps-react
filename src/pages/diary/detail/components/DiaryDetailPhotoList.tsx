import DiaryDetailHooks from '../DiaryDetailHooks';
import diaryDetailPhotosApi from 'src/api/diary/diary-detail-photos';
import { useFlattenPageData } from 'src/api/generate-infinite-query';
import PhotoPreviewList from 'src/components/photo/PhotoPreviewList';
import { PhotoPreview } from 'src/model/photo';

export default function DiaryDetailPhotoList() {
  const { date } = DiaryDetailHooks.usePageParams();
  const { data } = diaryDetailPhotosApi.useInfiniteApi({ date }, { suspense: false });
  const infiniteData = useFlattenPageData(data);

  const itemHref = (item: PhotoPreview) => '';

  if (infiniteData.length === 0) {
    return <></>;
  }

  return <PhotoPreviewList items={infiniteData} itemHref={itemHref} />;
}
