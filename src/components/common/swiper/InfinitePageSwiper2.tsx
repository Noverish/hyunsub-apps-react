import { UseInfiniteQueryResult } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import PageSwiper2, { PageSwiperProps } from 'src/components/common/swiper/PageSwiper2';
import { usePrevious } from 'src/hooks/previous';
import { Pagination } from 'src/model/api';
import Swiper from 'swiper';

export interface InfinitePageSwiperProps<T> extends Omit<PageSwiperProps<T>, 'slides'> {
  infiniteQueryResult: UseInfiniteQueryResult<Pagination<T>> & { infiniteData: T[] },
}

export default function InfinitePageSwiper<T>(props: InfinitePageSwiperProps<T>) {
  const { infiniteQueryResult, onSlideChange, ...etc } = props;
  const { infiniteData, fetchNextPage, fetchPreviousPage, hasNextPage, hasPreviousPage } = infiniteQueryResult;

  const prevInfiniteData = usePrevious(infiniteData);
  const isPrevLoading = useRef(false);
  const swiperRef = useRef<Swiper>();

  useEffect(() => {
    const currSize = infiniteData.length;
    const prevSize = prevInfiniteData?.length ?? currSize;
    const isLoading = isPrevLoading.current;
    const swiper = swiperRef.current;
    if (!swiper) {
      return;
    }

    if (isLoading && (currSize !== prevSize)) {
      const diff = currSize - prevSize;
      const index = swiper.activeIndex;
      swiper.slideTo(index + diff, 0);
      isPrevLoading.current = false;
    }
  }, [infiniteData, prevInfiniteData]);

  const onSwiper = (swiper: Swiper) => {
    swiperRef.current = swiper;
  }

  const onSlideChange2 = (index: number) => {
    onSlideChange?.(index);

    if (hasPreviousPage && index === 0) {
      isPrevLoading.current = true;
      fetchPreviousPage();
    } else if (hasNextPage && index === infiniteData.length - 1) {
      fetchNextPage();
    }
  }

  return (
    <PageSwiper2
      {...etc}
      onSwiper={onSwiper}
      onSlideChange={onSlideChange2}
      slides={infiniteData}
    />
  )
}
