import { useState } from "react";
import PageSwiper from "../PageSwiper";
import LoadingImage from "./LoadingImage";

interface Props {
  images: (string | null)[];
  onPageChange?: (page: number) => void;
  initialPage?: number;
}

const renderSlide = (slide: string | null) => <LoadingImage src={slide} />

export default function ImageSwiper({ images, onPageChange, initialPage }: Props) {
  const [page] = useState(initialPage || 0);

  return (
    <PageSwiper
      page={page}
      slides={images}
      renderSlide={renderSlide}
      onPageChange={onPageChange}
    />
  )
}
