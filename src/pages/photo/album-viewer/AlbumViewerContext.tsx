import { InfiniteData } from "@tanstack/react-query";
import albumPhotosApi from 'src/api/photo/album-photos';
import queryClient from "src/api/query-client";
import { PageData } from "src/model/api";
import { Photo } from 'src/model/photo';

export function useAlbumViewerPageFetch(albumId: number, photoId: number) {
  const result = albumPhotosApi.useInfiniteApi({ albumId, photoId }).data!!.pages[0];

  const key = albumPhotosApi.key({ albumId });
  const cache = queryClient.getQueryData<InfiniteData<PageData<Photo>>>(key);
  if (!cache) {
    queryClient.setQueryData<InfiniteData<PageData<Photo>>>(key, {
      pageParams: [result.page],
      pages: [result],
    });
  }

  return albumPhotosApi.useInfiniteApi({ albumId });
}
