import ApparelRoutes from '../../ApparelRoutes';
import ImageCarousel from 'src/components/common/swiper/ImageCarousel';
import { ApparelImage } from 'src/model/apparel';
import router from 'src/pages/router';

interface Props {
  apparelId: string;
  images: ApparelImage[];
}

export default function ApparelImageCarousel({ apparelId, images }: Props) {
  const onClick = (v: ApparelImage) => {
    router.navigate(ApparelRoutes.viewer({ apparelId, imageId: v.imageId }));
  };

  const urlSelector = (v: ApparelImage) => {
    return v.url + '?size=512';
  };

  return <ImageCarousel data={images} urlSelector={urlSelector} onClick={onClick} />;
}
