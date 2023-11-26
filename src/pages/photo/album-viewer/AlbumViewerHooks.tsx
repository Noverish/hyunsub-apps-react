import { t } from 'i18next';
import { useCallback, useContext } from 'react';

import { AlbumViewerContext } from './AlbumViewerContext';
import albumDetailApi from 'src/api/photo/album-detail';
import { useOptionalUrlParams, useUrlParams } from 'src/hooks/url-params';
import { MergedPageData } from 'src/model/api';
import { PhotoPreview } from 'src/model/photo';
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

function useOnIndexChange(mergedData: MergedPageData<PhotoPreview> | undefined) {
  const setState = useContext(AlbumViewerContext)[1];

  return useCallback(
    (index: number) => {
      if (!mergedData) {
        return;
      }

      const currPhotoId = mergedData.data[index]?.id;
      setState({ currPhotoId });
    },
    [mergedData, setState],
  );
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
  useOnIndexChange,
};

export default AlbumViewerHooks;
