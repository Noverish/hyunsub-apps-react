import { useCallback, useEffect } from 'react';

import photoListApi2 from 'src/api/photo/photo-list-2';
import { useOptionalUrlParams } from 'src/hooks/url-params';
import { PhotoPreview } from 'src/model/photo';
import CommonViewerHooks from 'src/pages/common/viewer/CommonViewerHooks';
import { CommonViewerData } from 'src/pages/common/viewer/components/CommonViewerSlide';

let prev: string | null = null;
let next: string | null = null;
let total: number = 0;

export interface PhotoViewerPageParams {
  photoId?: string;
}

function usePageParams(): PhotoViewerPageParams {
  const [photoId] = useOptionalUrlParams('photoId');
  return { photoId };
}

function useInitPage() {
  const { photoId } = usePageParams();
  const setSlides = CommonViewerHooks.useSetSlides();

  useEffect(() => {
    photoListApi2({ photoId }).then((result) => {
      const { data } = result;
      const initialIndex = photoId ? data.findIndex((v) => v.id === photoId) : undefined;
      setSlides(convertData(data), initialIndex);
      prev = result.prev;
      next = result.next;
      total = data.length;
    });
  }, [photoId, setSlides]);
}

function useFetchPage() {
  const prependSlides = CommonViewerHooks.usePrependSlides();
  const appendSlides = CommonViewerHooks.useAppendSlides();

  return useCallback(
    (isPrev: boolean) => {
      if (isPrev) {
        if (!prev) {
          return;
        }

        photoListApi2({ prev }).then((result) => {
          const { data } = result;
          total += data.length;
          prependSlides(convertData(data));
          prev = result.prev;
        });
      } else {
        if (!next) {
          return;
        }

        photoListApi2({ next }).then((result) => {
          const { data } = result;
          total += data.length;
          appendSlides(convertData(data));
          next = result.next;
        });
      }
    },
    [prependSlides, appendSlides],
  );
}

function useOnIndexReady() {
  const fetchPage = useFetchPage();

  return useCallback(
    (from: number, to: number) => {
      if (from === 0) {
        fetchPage(true);
      }
      if (to === total - 1) {
        fetchPage(false);
      }
    },
    [fetchPage],
  );
}

function toViewerData(preview: PhotoPreview | null): CommonViewerData {
  if (!preview) {
    return { type: 'photo' };
  }

  const { type, thumbnail, ext } = preview;

  if (type === 'PHOTO') {
    return {
      type: 'photo',
      url: thumbnail.replace('thumbnail', 'original').replace('jpg', ext) + '?size=1024',
    };
  }

  return {
    type: 'video',
    url: thumbnail.replace('thumbnail', 'video').replace('.jpg', '.mp4'),
  };
}

function convertData(previews: (PhotoPreview | null)[]): CommonViewerData[] {
  return previews.map((v) => toViewerData(v));
}

const PhotoViewerHooks = {
  usePageParams,
  useInitPage,
  useOnIndexReady,
  convertData,
};

export default PhotoViewerHooks;
