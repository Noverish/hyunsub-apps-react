import { t } from 'i18next';
import { useCallback } from 'react';

import PhotoViewerHooks from './PhotoViewerHooks';
import { useMergedPageData } from 'src/api/generate-infinite-query';
import photoSearchApi from 'src/api/photo/photo-search';
import PhotoInfoSection from 'src/components/photo/PhotoInfoSection';
import PhotoHooks from 'src/hooks/photo';
import { PhotoPreview } from 'src/model/photo';
import CommonViewerPage from 'src/pages/common/viewer/CommonViewerPage';
import { setDocumentTitle } from 'src/utils/services';

export default function PhotoViewerPage() {
  setDocumentTitle(t('PhotoListPage.title'));

  const { photoId, start, end } = PhotoViewerHooks.usePageParams();
  PhotoViewerHooks.useInitPage();

  const params = {
    dateRange: start && end ? { start, end } : undefined,
    photoId,
  };
  const { fetchNextPage, data } = photoSearchApi.useInfiniteApi(params, { suspense: true });
  const mergedData = useMergedPageData(data)!;
  const slides = mergedData.data;
  const initialIndex = slides.findIndex((v) => v?.id === photoId) ?? 0;

  const fetchPage = useCallback(
    (page: number) => fetchNextPage({ pageParam: page, cancelRefetch: false }),
    [fetchNextPage],
  );

  const onIndexReady = PhotoViewerHooks.useOnIndexReady(slides, fetchPage, mergedData.pageSize);

  const renderInfoSection = (preview: PhotoPreview | null) => {
    return preview ? <PhotoInfoSection preview={preview} /> : undefined;
  };

  return (
    <CommonViewerPage
      slides={slides}
      convertSlide={PhotoHooks.convertSlide}
      onIndexReady={onIndexReady}
      initialIndex={initialIndex}
      renderInfoSection={renderInfoSection}
    />
  );
}
