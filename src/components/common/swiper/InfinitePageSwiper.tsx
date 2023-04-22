import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import { useRef } from 'react';
import { flatInfiniteData } from 'src/api/generate-api';
import { PageData } from 'src/model/api';
import PageSwiper, { PageSwiperProps } from './PageSwiper';

const READY_OFF_SLIDE_SIZE = 5;

export interface InfinitePageSwiperProps<T> extends Omit<PageSwiperProps<T>, 'slides'> {
  infiniteQueryResult: UseInfiniteQueryResult<PageData<T>>,
}

function getPage<T>(data: InfiniteData<PageData<T>>, index: number): number {
  const { pageSize, total } = data.pages[0];
  const safeIndex = Math.min(Math.max(index, 0), total - 1);
  return Math.floor(safeIndex / pageSize);
}

export default function InfinitePageSwiper<T>(props: InfinitePageSwiperProps<T>) {
  const { infiniteQueryResult, onPageChange, ...etc } = props;
  const data = infiniteQueryResult.data!!;
  const { fetchNextPage } = infiniteQueryResult;
  const pageParams = (data.pageParams as number[]).map(v => v ? v : 0);

  // hooks
  const loadingRef = useRef<number[]>([]);

  const readyPage = (page: number) => {
    if (pageParams.includes(page) || loadingRef.current.includes(page)) {
      return;
    }
    loadingRef.current.push(page);
    fetchNextPage({ pageParam: page });
  }

  const onSlideChange = (index: number) => {
    onPageChange?.(index);

    const pageBehind = getPage(data, index - READY_OFF_SLIDE_SIZE);
    readyPage(pageBehind);

    const pageAhead = getPage(data, index + READY_OFF_SLIDE_SIZE);
    readyPage(pageAhead);
  }

  return (
    <PageSwiper
      {...etc}
      slides={flatInfiniteData(data)}
      onPageChange={onSlideChange}
    />
  )
}
