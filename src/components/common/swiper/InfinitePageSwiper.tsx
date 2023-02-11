import { InfiniteData } from '@tanstack/react-query';
import { useRef } from 'react';
import { flatInfiniteData } from 'src/api/generate-api';
import { PageData } from 'src/model/api';
import PageSwiper, { PageSwiperProps } from './PageSwiper';

export type Data<T> = InfiniteData<PageData<T>>;
export type SlideList<T> = (T | null)[];

interface Props<T> extends Omit<PageSwiperProps<T>, 'slides'> {
  data: Data<T>;
  readyOffSlideSize?: number;
  fetchSlides: (page: number) => void;
}

function getPage<T>(data: Data<T>, index: number): number {
  const { pageSize } = data.pages[0];
  return Math.floor(index / pageSize);
}

export default function InfinitePageSwiper<T>(props: Props<T>) {
  const {
    data,
    readyOffSlideSize = 0,
    fetchSlides,
    onPageChange,
    ...etc
  } = props;

  const loadingRef = useRef(new Map<number, boolean>());

  const readyPage = (page: number) => {
    if (data.pageParams.includes(page) || loadingRef.current.get(page)) {
      return;
    }
    loadingRef.current.set(page, true);
    fetchSlides(page);
  }

  const onSlideChange = (index: number) => {
    onPageChange?.(index);

    const pageBehind = getPage(data, index - readyOffSlideSize);
    readyPage(pageBehind);

    const pageAhead = getPage(data, index + readyOffSlideSize);
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
