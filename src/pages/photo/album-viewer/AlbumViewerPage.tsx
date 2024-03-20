import { t } from 'i18next';
import { useCallback } from 'react';

import AlbumViewerHooks from './AlbumViewerHooks';
import { useMergedPageData } from 'src/api/generate-infinite-query';
import albumPhotosApi from 'src/api/photo/album-photos';
import PhotoInfoSection from 'src/components/photo/PhotoInfoSection';
import PhotoHooks from 'src/hooks/photo';
import { PhotoPreview } from 'src/model/photo';
import CommonViewerPage from 'src/pages/common/viewer/CommonViewerPage';
import { setDocumentTitle } from 'src/utils/services';

export default function AlbumViewerPage() {
  setDocumentTitle(t('AlbumViewerPage.title'));

  const { albumId, photoId } = AlbumViewerHooks.usePageParams();
  AlbumViewerHooks.usePageInit();

  const { fetchNextPage, data } = albumPhotosApi.useInfiniteApi({ albumId, photoId }, { suspense: true });
  const mergedData = useMergedPageData(data)!;
  const slides = mergedData.data;
  const initialIndex = slides.findIndex((v) => v?.id === photoId) ?? 0;

  const fetchPage = useCallback(
    (page: number) => fetchNextPage({ pageParam: page, cancelRefetch: false }),
    [fetchNextPage],
  );

  const onIndexReady = AlbumViewerHooks.useOnIndexReady(slides, fetchPage, mergedData.pageSize);

  const renderInfoSection = (preview: PhotoPreview | null) => {
    return preview ? <PhotoInfoSection albumId={albumId} preview={preview} /> : undefined;
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
