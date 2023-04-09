import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import albumDetailV2Api from 'src/api/photo/album-detail-v2';
import albumPhotosApi2 from 'src/api/photo/album-photos-v2';
import useScrollBottom from 'src/hooks/scroll-bottom';

export function useAlbumDetailPage() {
  const albumId = useParams().albumId!!;

  const album = albumDetailV2Api.useApi({ albumId });

  const { data, fetchNextPage, isFetching } = albumPhotosApi2.useInfiniteApi({ albumId }, album.photos);
  const pages = data?.pages;
  const photos = useMemo(() => pages?.flatMap(v => v.data) || [], [pages]);

  useScrollBottom(() => {
    if (!isFetching) {
      fetchNextPage();
    }
  });

  return {
    album,
    photos,
    isFetching,
  }
}
