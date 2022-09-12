import { Dispatch } from "@reduxjs/toolkit";
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import flatMap from 'lodash/flatMap';
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import albumExifDateApi from "src/api/photo/album-exif-date";
import photoUpdateApi from "src/api/photo/photo-update";
import queryClient from 'src/api/query-client';
import PhotoExifDateTable from "src/components/photo/PhotoExifDateTable";
import { PageData } from "src/model/api";
import { PhotoExifDate } from "src/model/photo";
import { RootState, useDispatch } from "src/redux";
import { GlobalActions } from 'src/redux/global';
import { useScrollBottom } from 'src/utils';

const updateDate = (albumId: number, data: PhotoExifDate, date: string) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch(GlobalActions.update({ loading: true }));

  const result = await photoUpdateApi({ id: data.photoId, date });
  const key = albumExifDateApi.key({ albumId, page: 0 });
  queryClient.setQueryData<InfiniteData<PageData<PhotoExifDate>>>(key, (cache) => {
    if (!cache) {
      return cache;
    }

    for(const page of cache.pages) {
      for(const item of page.data) {
        if (item.photoId === data.photoId) {
          item.date = result.date;
        }
      }
    }

    return cache;
  })

  dispatch(GlobalActions.update({ loading: false }));
}

export default function AlbumExifDatePage() {
  const dispatch = useDispatch();
  const albumId = parseInt(useParams().albumId!!, 10);

  const { data, fetchNextPage, isFetching } = useInfiniteQuery(
    albumExifDateApi.key({ albumId, page: 0 }),
    ({ pageParam }) => albumExifDateApi.fetch({ albumId, page: pageParam ?? 0 }),
    {
      getNextPageParam: (lastPage, pages) => (lastPage.total === lastPage.end + 1) ? undefined : pages.length,
      staleTime: Infinity,
    }
  );

  useScrollBottom(() => {
    if (!isFetching) {
      fetchNextPage();
    }
  }, [isFetching, fetchNextPage]);

  const onCellClick = (data: PhotoExifDate, date: string) => {
    dispatch(updateDate(albumId, data, date));
  }

  const list = flatMap(data!!.pages.map(v => v.data));

  return (
    <div id="AlbumExifDatePage">
      <h1>AlbumExifDatePage</h1>
      <PhotoExifDateTable list={list} onCellClick={onCellClick} />
      {isFetching && <div className="flex_center" style={{ height: '8rem' }}>
        <Spinner animation="border"></Spinner>
      </div>}
    </div>
  )
}
