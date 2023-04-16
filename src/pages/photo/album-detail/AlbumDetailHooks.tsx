import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import albumDetailApi from 'src/api/photo/album-detail';
import albumPhotosApi from 'src/api/photo/album-photos';
import useScrollBottom from 'src/hooks/scroll-bottom';

export function useAlbumDetailPage() {
  const albumId = useParams().albumId!!;

  const album = albumDetailApi.useApi({ albumId });

  const { data, fetchNextPage, isFetching } = albumPhotosApi.useInfiniteApi({ albumId }, album.photos);
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
