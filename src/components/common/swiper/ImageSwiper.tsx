import LoadingImage from './LoadingImage';
import PageSwiper, { PageSwiperProps } from './PageSwiper';

interface Props extends Omit<PageSwiperProps<string>, 'renderSlide'> {}

const renderSlide = (slide: string | null) => <LoadingImage src={slide} />;

export default function ImageSwiper(props: Props) {
  return <PageSwiper renderSlide={renderSlide} {...props} />;
}
