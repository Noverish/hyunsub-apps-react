import { useState } from 'react';

import { renderSlide } from './PhotoSwiper';
import { MobileHeaderButton } from 'src/components/common/header/MobileHeader';
import InfinitePageSwiper2, { InfinitePageSwiperProps } from 'src/components/common/swiper/InfinitePageSwiper2';
import PhotoInfoSection from 'src/components/photo/PhotoInfoSection';
import { PhotoPreview } from 'src/model/photo';

export interface PhotoSwiperProps extends Omit<InfinitePageSwiperProps<PhotoPreview>, 'renderSlide'> {
  photoId?: string;
}

export default function PhotoSwiper(props: PhotoSwiperProps) {
  const [showInfo, setShowInfo] = useState(false);
  const [nowPhotoId, setNowPhotoId] = useState<string>();

  // functions
  const hideInfo = () => setShowInfo(false);

  const onSlideChange = (index: number, slide: PhotoPreview | null) => {
    setNowPhotoId(slide?.id);
  };

  // elements
  const headerBtns: MobileHeaderButton[] = [
    {
      icon: 'fas fa-info-circle',
      onClick: () => setShowInfo((v) => !v),
    },
  ];

  return (
    <div className="PhotoSwiper">
      <div className="photo_viewer_container">
        <InfinitePageSwiper2 {...props} renderSlide={renderSlide} btns={headerBtns} onSlideChange={onSlideChange} />
      </div>
      <PhotoInfoSection show={showInfo} hide={hideInfo} photoId={nowPhotoId} />
    </div>
  );
}
