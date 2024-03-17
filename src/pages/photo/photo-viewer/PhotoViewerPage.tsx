import { t } from 'i18next';
import { useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import Swiper from 'swiper';

import { PhotoViewerContext, PhotoViewerProvider } from './PhotoViewerContext';
import PhotoViewerHooks from './PhotoViewerHooks';
import { useMergedPageData } from 'src/api/generate-infinite-query';
import photoSearchApi from 'src/api/photo/photo-search';
import PhotoInfoSection from 'src/components/photo/PhotoInfoSection';
import PhotoHooks from 'src/hooks/photo';
import CommonViewerPage from 'src/pages/common/viewer/CommonViewerPage';
import { CommonViewerData } from 'src/pages/common/viewer/components/CommonViewerSlide';
import { setDocumentTitle } from 'src/utils/services';

function PhotoViewerPage() {
  setDocumentTitle(t('PhotoListPage.title'));

  const { photoId, start, end } = PhotoViewerHooks.usePageParams();
  PhotoViewerHooks.useInitPage();

  const params = {
    dateRange: start && end ? { start, end } : undefined,
    photoId,
  };
  const { fetchNextPage, data } = photoSearchApi.useInfiniteApi(params, { suspense: false });
  const mergedData = useMergedPageData(data);
  const slides: CommonViewerData[] = useMemo(() => PhotoHooks.convertData(mergedData?.data ?? []), [mergedData]);
  const initialIndex = mergedData?.data.findIndex((v) => v?.id === photoId) ?? 0;
  const swiperRef = useRef<Swiper>();
  const swiper = swiperRef.current;

  const [state] = useContext(PhotoViewerContext);
  const currPhotoId = state.currPhotoId ?? photoId;

  const fetchPage = useCallback(
    (page: number) => {
      console.log({ page });
      fetchNextPage({ pageParam: page, cancelRefetch: false });
    },
    [fetchNextPage],
  );

  const onIndexReady = PhotoViewerHooks.useOnIndexReady(slides, fetchPage, mergedData?.pageSize);
  const onIndexChange = PhotoViewerHooks.useOnIndexChange(mergedData);

  useEffect(() => {
    if (swiper) {
      swiper.slideTo(initialIndex, 0);
    }
  }, [swiper, initialIndex]);

  return (
    <CommonViewerPage
      slides={slides}
      onIndexReady={onIndexReady}
      onIndexChange={onIndexChange}
      initialIndex={initialIndex}
      swiperRef={swiperRef}
      infoSection={currPhotoId ? <PhotoInfoSection photoId={currPhotoId} /> : undefined}
    />
  );
}

export default function PhotoViewerIndex() {
  return (
    <PhotoViewerProvider>
      <PhotoViewerPage />
    </PhotoViewerProvider>
  );
}
