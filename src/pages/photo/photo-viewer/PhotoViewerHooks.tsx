import { useCallback } from 'react';

import { PhotoViewerContext } from './PhotoViewerContext';
import { useOptionalUrlParams } from 'src/hooks/url-params';
import { MergedPageData } from 'src/model/api';
import { PhotoPreview } from 'src/model/photo';
import { CommonViewerData } from 'src/pages/common/viewer/components/CommonViewerSlide';
import { useContextSetter } from 'src/utils/context';

export interface PhotoViewerPageParams {
  photoId?: string;
  start?: string;
  end?: string;
}

function usePageParams(): PhotoViewerPageParams {
  const [photoId, start, end] = useOptionalUrlParams('photoId', 'start', 'end');
  return { photoId, start, end };
}

function useInitPage() {}

function useOnIndexChange(mergedData: MergedPageData<PhotoPreview> | undefined) {
  const setState = useContextSetter(PhotoViewerContext);

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

      console.log({ from, to });

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

const PhotoViewerHooks = {
  usePageParams,
  useInitPage,
  useOnIndexReady,
  useOnIndexChange,
};

export default PhotoViewerHooks;
