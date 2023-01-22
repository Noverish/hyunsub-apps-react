import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { PageData } from 'src/model/api';
import PageSwiper, { PageSwiperProps } from './PageSwiper';

export type PageDataList<T> = (PageData<T> | null)[];
export type SlideList<T> = (T | null)[];

interface Props<T> extends PageSwiperProps<T> {
  pageDataList: PageDataList<T>;
  readyOffSlideSize?: number;
  fetchInitial: () => Promise<PageData<T>>;
  fetchSlides: (page: number) => void;
}

export function makeSlides<T>(pageDataList: PageDataList<T>): (T | null)[] {
  const anyPageData = pageDataList.filter(v => !!v)[0];
  if (!anyPageData) {
    return [];
  }

  const slides = Array.from({ length: anyPageData.total }, () => null as T | null);

  for (const pageData of pageDataList) {
    if (pageData) {
      const { start, end } = pageData;
      for (let i = start; i <= end; i++) {
        slides[i] = pageData.data[i - start];
      }
    }
  }

  return slides;
}

function getPage<T>(pageDataList: PageDataList<T>, index: number) {
  const anyPageData = pageDataList.filter(v => !!v)[0]!!;
  const safeIndex = Math.max(Math.min(index, anyPageData.total - 1), 0);
  return Math.floor(safeIndex / anyPageData.pageSize);
}

export default function PageSwiperWrapper<T>(props: Props<T>) {
  const {
    pageDataList,
    fetchInitial: initialFetchSlides,
    fetchSlides,
    readyOffSlideSize = 0,
    onPageChange,
    ...etc
  } = props;

  useQuery(['PageSwiperWrapper'], () => initialFetchSlides());

  const loadingRef = useRef(new Map<number, boolean>());

  const readyPage = (page: number) => {
    if (pageDataList[page] || loadingRef.current.get(page)) {
      return;
    }
    loadingRef.current.set(page, true);
    fetchSlides(page);
  }

  const onSlideChange = (index: number) => {
    onPageChange?.(index);

    const pageBehind = getPage(pageDataList, index - readyOffSlideSize);
    readyPage(pageBehind);

    const pageAhead = getPage(pageDataList, index + readyOffSlideSize);
    readyPage(pageAhead);
  }

  return (
    <PageSwiper
      {...etc}
      onPageChange={onSlideChange}
    />
  )
}
