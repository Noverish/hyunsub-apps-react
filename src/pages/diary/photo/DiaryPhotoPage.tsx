import { t } from 'i18next';

import DiaryRoutes from '../DiaryRoutes';
import DiaryPhotoHooks from './DiaryPhotoHooks';
import diaryDetailPhotosApi from 'src/api/diary/diary-detail-photos';
import { useFlattenPageData, useTotal } from 'src/api/generate-infinite-query';
import ListLoadingIndicator from 'src/components/common/ListLoadingIndicator';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import PhotoListView from 'src/components/photo/photo-list/PhotoListView';
import { PhotoSelectProvider } from 'src/components/photo/photo-list/PhotoSelectContext';
import { PhotoPreview } from 'src/model/photo';

export default function DiaryPhotoPage() {
  const { date } = DiaryPhotoHooks.usePageParams();
  const { data, isFetching } = diaryDetailPhotosApi.useInfiniteApi({ date }, { suspense: false });
  const photos = useFlattenPageData(data);
  const total = useTotal(data);

  const itemHref = (item: PhotoPreview) => {
    return DiaryRoutes.viewer({ date, photoId: item.id });
  };

  return (
    <PhotoSelectProvider>
      <CommonLayout className="DiaryPhotoPage" title={t('DiaryPhotoPage.title', { date })} back>
        <h3 className="mb-3">{t('DiaryPhotoPage.subtitle', { total })}</h3>
        <PhotoListView photos={photos} itemHref={itemHref} />
        <ListLoadingIndicator isFetching={isFetching} />
      </CommonLayout>
    </PhotoSelectProvider>
  );
}
