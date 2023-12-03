import { t } from 'i18next';
import { useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import Swiper from 'swiper';

import { AlbumViewerContext, AlbumViewerProvider } from './AlbumViewerContext';
import AlbumViewerHooks from './AlbumViewerHooks';
import { useMergedPageData } from 'src/api/generate-infinite-query';
import albumPhotosApi from 'src/api/photo/album-photos';
import PhotoInfoSection from 'src/components/photo/PhotoInfoSection';
import CommonViewerPage from 'src/pages/common/viewer/CommonViewerPage';
import { CommonViewerData } from 'src/pages/common/viewer/components/CommonViewerSlide';
import PhotoViewerHooks from 'src/pages/photo/photo-viewer/PhotoViewerHooks';
import { setDocumentTitle } from 'src/utils/services';

function AlbumViewerPage() {
  setDocumentTitle(t('AlbumViewerPage.title'));

  const { albumId, photoId } = AlbumViewerHooks.usePageParams();
  AlbumViewerHooks.usePageInit();

  const { fetchNextPage, data } = albumPhotosApi.useInfiniteApi({ albumId, photoId }, { suspense: false });
  const mergedData = useMergedPageData(data);
  const slides: CommonViewerData[] = useMemo(() => PhotoViewerHooks.convertData(mergedData?.data ?? []), [mergedData]);
  const initialIndex = mergedData?.data.findIndex((v) => v?.id === photoId) ?? 0;
  const swiperRef = useRef<Swiper>();
  const swiper = swiperRef.current;

  const [state] = useContext(AlbumViewerContext);
  const currPhotoId = state.currPhotoId ?? photoId;

  const fetchPage = useCallback(
    (page: number) => {
      fetchNextPage({ pageParam: page, cancelRefetch: false });
    },
    [fetchNextPage],
  );

  const onIndexReady = AlbumViewerHooks.useOnIndexReady(slides, fetchPage, mergedData?.pageSize);
  const onIndexChange = AlbumViewerHooks.useOnIndexChange(mergedData);

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
      infoSection={currPhotoId ? <PhotoInfoSection albumId={albumId} photoId={currPhotoId} /> : undefined}
    />
  );
}

export default function AlbumViewerIndex() {
  return (
    <AlbumViewerProvider>
      <AlbumViewerPage />
    </AlbumViewerProvider>
  );
}
