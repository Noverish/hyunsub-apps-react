import { Dispatch } from "@reduxjs/toolkit";
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import flatMap from 'lodash/flatMap';
import { useParams } from 'react-router-dom';
import albumDateApi from "src/api/photo/album-date";
import photoUpdateApi from "src/api/photo/photo-update";
import queryClient from 'src/api/query-client';
import CommonContainer from "src/components/common/header/CommonContainer";
import ListLoadingIndicator from 'src/components/common/ListLoadingIndicator';
import PhotoDateTable from "src/components/photo/PhotoDateTable";
import { PageData } from "src/model/api";
import { PhotoDate } from "src/model/photo";
import { RootState, useDispatch } from "src/redux";
import { GlobalActions } from 'src/redux/global';
import useScrollBottom from 'src/hooks/scroll-bottom';

const updateDate = (albumId: number, data: PhotoDate, date: string) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch(GlobalActions.update({ loading: true }));

  const result = await photoUpdateApi({ id: data.photoId, date });
  const key = albumDateApi.key({ albumId, page: 0 });
  queryClient.setQueryData<InfiniteData<PageData<PhotoDate>>>(key, (cache) => {
    if (!cache) {
      return cache;
    }

    for (const page of cache.pages) {
      for (const item of page.data) {
        if (item.photoId === data.photoId) {
          item.date = result.date;
        }
      }
    }

    return cache;
  })

  dispatch(GlobalActions.update({ loading: false }));
}

export default function AlbumDatePage() {
  const dispatch = useDispatch();
  const albumId = parseInt(useParams().albumId!!, 10);

  const { data, fetchNextPage, isFetching } = useInfiniteQuery(
    albumDateApi.key({ albumId, page: 0 }),
    ({ pageParam }) => albumDateApi.fetch({ albumId, page: pageParam ?? 0 }),
    {
      getNextPageParam: (lastPage, pages) => (lastPage.data.length === 0) ? undefined : pages.length,
      staleTime: Infinity,
    }
  );

  useScrollBottom(() => {
    if (!isFetching) {
      fetchNextPage();
    }
  });

  const onCellClick = (data: PhotoDate, date: string) => {
    dispatch(updateDate(albumId, data, date));
  }

  const list = flatMap(data!!.pages.map(v => v.data));

  return (
    <div id="AlbumDatePage">
      <CommonContainer noContainer>
        <h1>AlbumDatePage</h1>
        <PhotoDateTable list={list} onCellClick={onCellClick} />
        <ListLoadingIndicator isFetching={isFetching} />
      </CommonContainer>
    </div>
  )
}
