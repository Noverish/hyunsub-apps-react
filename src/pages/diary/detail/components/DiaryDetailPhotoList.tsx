import DiaryDetailHooks from '../DiaryDetailHooks';
import diaryDetailPhotosApi from 'src/api/diary/diary-detail-photos';
import PhotoPreviewList from 'src/components/photo/PhotoPreviewList';
import { PhotoPreview } from 'src/model/photo';

export default function DiaryDetailPhotoList() {
  const { date } = DiaryDetailHooks.usePageParams();
  const { infiniteData } = diaryDetailPhotosApi.useInfiniteApi({ date });

  const itemHref = (item: PhotoPreview) => '';

  return <PhotoPreviewList items={infiniteData} itemHref={itemHref} />;
}
