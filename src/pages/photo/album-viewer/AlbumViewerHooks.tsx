import { t } from 'i18next';
import { useCallback } from 'react';

import albumDetailApi from 'src/api/photo/album-detail';
import { useOptionalUrlParams, useUrlParams } from 'src/hooks/url-params';
import { PhotoPreview } from 'src/model/photo';
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

function useOnIndexReady(slides: (PhotoPreview | null)[], fetchPage: (page: number) => void, pageSize?: number) {
  return useCallback(
    (from: number, to: number) => {
      if (!pageSize) {
        return;
      }

      if (!slides[from]) {
        const fromPage = Math.floor(from / pageSize);
        fetchPage(fromPage);
      }
      if (!slides[to]) {
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
