import { useCallback } from 'react';

import { useOptionalUrlParams } from 'src/hooks/url-params';
import { PhotoPreview } from 'src/model/photo';

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

function useOnIndexReady(slides: (PhotoPreview | null)[], fetchPage: (page: number) => void, pageSize?: number) {
  return useCallback(
    (from: number, to: number) => {
      if (!pageSize) {
        return;
      }

      console.log({ from, to });

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

const PhotoViewerHooks = {
  usePageParams,
  useInitPage,
  useOnIndexReady,
};

export default PhotoViewerHooks;
