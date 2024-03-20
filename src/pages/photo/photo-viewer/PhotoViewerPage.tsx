import { t } from 'i18next';
import { useCallback, useEffect, useRef } from 'react';
import Swiper from 'swiper';

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
  const { fetchNextPage, data } = photoSearchApi.useInfiniteApi(params, { suspense: false });
  const mergedData = useMergedPageData(data);
  const data2 = mergedData?.data ?? [];
  const initialIndex = mergedData?.data.findIndex((v) => v?.id === photoId) ?? 0;
  const swiperRef = useRef<Swiper>();
  const swiper = swiperRef.current;

  const fetchPage = useCallback(
    (page: number) => {
      console.log({ page });
      fetchNextPage({ pageParam: page, cancelRefetch: false });
    },
    [fetchNextPage],
  );

  const onIndexReady = PhotoViewerHooks.useOnIndexReady(data2, fetchPage, mergedData?.pageSize);

  useEffect(() => {
    if (swiper) {
      swiper.slideTo(initialIndex, 0);
    }
  }, [swiper, initialIndex]);

  const renderInfoSection = (preview: PhotoPreview | null) => {
    return preview ? <PhotoInfoSection preview={preview} /> : undefined;
  };

  return (
    <CommonViewerPage
      slides={data2}
      convertSlide={PhotoHooks.convertSlide}
      onIndexReady={onIndexReady}
      initialIndex={initialIndex}
      swiperRef={swiperRef}
      renderInfoSection={renderInfoSection}
    />
  );
}
