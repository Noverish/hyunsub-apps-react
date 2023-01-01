import { useState } from "react";
import PageSwiper from "../PageSwiper";
import LoadingImage from "./LoadingImage";

interface Props {
  images: (string | null)[];
}

const renderSlide = (slide: string | null) => <LoadingImage src={slide} />

export default function ImageSwiper({ images }: Props) {
  const [page] = useState(0);

  const onPageChange = () => {

  }

  return (
    <PageSwiper
      page={page}
      slides={images}
      renderSlide={renderSlide}
      onPageChange={onPageChange}
    />
  )
}
