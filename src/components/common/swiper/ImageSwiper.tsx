import PageSwiper, { PageSwiperV2Props } from "../PageSwiperV2";
import LoadingImage from "./LoadingImage";

interface Props extends Omit<PageSwiperV2Props<string>, 'renderSlide'> {

}

const renderSlide = (slide: string | null) => <LoadingImage src={slide} />

export default function ImageSwiper(props: Props) {
  return (
    <PageSwiper
      renderSlide={renderSlide}
      {...props}
    />
  )
}
