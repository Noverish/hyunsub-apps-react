import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { PageData } from 'src/model/api';
import PageSwiper from './PageSwiper';

export type PageDataList<T> = (PageData<T> | null)[];
export type SlideList<T> = (T | null)[];

interface Props<T> {
  readyOffSlideSize?: number;
  slidePredicate: (slide: T | null) => boolean;
  renderSlide: (slide: T | null) => JSX.Element;
  onSlideChange: (slide: T) => void;
  fetchSlides: (page?: number) => Promise<PageData<T>>;
}

function makePageDataList<T>(pageData: PageData<T>): PageDataList<T> {
  const { total, pageSize, page } = pageData;
  const totalPage = Math.floor((total - 1) / pageSize) + 1;
  return Array.from(
    { length: totalPage },
    (_, i) => i === page ? pageData : null,
  )
}

function makeSlides<T>(pageDataList: PageDataList<T>): (T | null)[] {
  const anyPageData = pageDataList.filter(v => !!v)[0]!!;
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
  const { fetchSlides, readyOffSlideSize = 0 } = props;

  const initPageData = useQuery(['PageSwiperWrapper'], () => fetchSlides()).data!!;
  const [pageDataList, setPageDataList] = useState<PageDataList<T>>(makePageDataList(initPageData));
  const loadingRef = useRef(new Map<number, boolean>());

  const slides = makeSlides(pageDataList);
  const index = slides.findIndex(props.slidePredicate);

  const readyPage = (page: number) => {
    if (pageDataList[page] || loadingRef.current.get(page)) {
      return;
    }
    loadingRef.current.set(page, true);

    props.fetchSlides(page)
      .then((pageData) => {
        pageDataList[pageData.page] = pageData;
        setPageDataList([...pageDataList]);
        loadingRef.current.delete(page);
      });
  }

  const onSlideChange = (index: number) => {
    // TODO 로딩 전 페이지로 넘어갔을 때 어떻게 콜백 처리할지 고민하기
    const slide = slides[index];
    if (slide) {
      props.onSlideChange(slide);
    }

    const pageBehind = getPage(pageDataList, index - readyOffSlideSize);
    readyPage(pageBehind);

    const pageAhead = getPage(pageDataList, index + readyOffSlideSize);
    readyPage(pageAhead);
  }

  return (
    <PageSwiper
      page={index}
      slides={slides}
      onPageChange={onSlideChange}
      renderSlide={props.renderSlide}
    />
  )
}
