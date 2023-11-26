import { t } from 'i18next';
import { useCallback } from 'react';

import albumDetailApi from 'src/api/photo/album-detail';
import { useOptionalUrlParams, useUrlParams } from 'src/hooks/url-params';
import { CommonViewerData } from 'src/pages/common/viewer/components/CommonViewerSlide';
import { setDocumentTitle } from 'src/utils/services';

export interface AlbumViewerPageParams {
  albumId: string;
  photoId?: string;
}

function usePageParams(): AlbumViewerPageParams {
  const [albumId] = useUrlParams('albumId');
  const [photoId] = useOptionalUrlParams('photoId');

  return {
    albumId,
    photoId,
  };
}

function usePageInit() {
  const { albumId } = usePageParams();

  const { data } = albumDetailApi.useApiResult({ albumId });
  if (data) {
    setDocumentTitle(t('photo.page.album-detail.title', [data.name]));
  }
}

function useOnIndexReady(slides: CommonViewerData[], fetchPage: (page: number) => void, pageSize?: number) {
  return useCallback(
    (from: number, to: number) => {
      if (!pageSize) {
        return;
      }

      if (!slides[from].url) {
        const fromPage = Math.floor(from / pageSize);
        fetchPage(fromPage);
      }
      if (!slides[to].url) {
        const toPage = Math.floor(to / pageSize);
        fetchPage(toPage);
      }
    },
    [slides, pageSize, fetchPage],
  );
}

const AlbumViewerHooks = {
  usePageParams,
  usePageInit,
  useOnIndexReady,
};

export default AlbumViewerHooks;
