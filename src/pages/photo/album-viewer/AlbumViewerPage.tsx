import { useCallback, useEffect, useMemo, useRef } from 'react';
import Swiper from 'swiper';

import AlbumViewerHooks from './AlbumViewerHooks';
import { useMergedPageData } from 'src/api/generate-infinite-query';
import albumPhotosApi from 'src/api/photo/album-photos';
import CommonViewerPage from 'src/pages/common/viewer/CommonViewerPage';
import { CommonViewerData } from 'src/pages/common/viewer/components/CommonViewerSlide';
import PhotoViewerHooks from 'src/pages/photo/photo-viewer/PhotoViewerHooks';

export default function AlbumViewerPage() {
  const { albumId, photoId } = AlbumViewerHooks.usePageParams();
  AlbumViewerHooks.usePageInit();

  const { fetchNextPage, data } = albumPhotosApi.useInfiniteApi({ albumId, photoId }, { suspense: false });
  const mergedData = useMergedPageData(data);
  const slides: CommonViewerData[] = useMemo(() => PhotoViewerHooks.convertData(mergedData?.data ?? []), [mergedData]);
  const initialIndex = mergedData?.data.findIndex((v) => v?.id === photoId) ?? 0;
  const swiperRef = useRef<Swiper>();
  const swiper = swiperRef.current;

  const fetchPage = useCallback(
    (page: number) => {
      fetchNextPage({ pageParam: page, cancelRefetch: false });
    },
    [fetchNextPage],
  );

  const onIndexReady = AlbumViewerHooks.useOnIndexReady(slides, fetchPage, mergedData?.pageSize);

  useEffect(() => {
    if (swiper) {
      swiper.slideTo(initialIndex, 0);
    }
  }, [swiper, initialIndex]);

  return (
    <CommonViewerPage slides={slides} onIndexReady={onIndexReady} initialIndex={initialIndex} swiperRef={swiperRef} />
  );
}
