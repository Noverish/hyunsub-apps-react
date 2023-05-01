import { Spinner } from 'react-bootstrap';
import InfinitePageSwiper, { InfinitePageSwiperProps } from 'src/components/common/swiper/InfinitePageSwiper';
import { PhotoPreview } from 'src/model/photo';
import PhotoInfoSection from 'src/components/photo/PhotoInfoSection';
import { useState } from 'react';
import { MobileHeaderButton } from 'src/components/common/header/MobileHeader';

import './PhotoSwiper.scss';

export interface PhotoSwiperProps extends Omit<InfinitePageSwiperProps<PhotoPreview>, 'renderSlide'> {
  albumId: string;
  photoId?: string;
}

export default function PhotoSwiper(props: PhotoSwiperProps) {
  const [showInfo, setShowInfo] = useState(false);
  const [nowPhotoId, setNowPhotoId] = useState(props.photoId);

  // functions
  const hideInfo = () => setShowInfo(false);

  const onSlideChange = (index: number, slide: PhotoPreview | null) => {
    setNowPhotoId(slide?.id);
  }

  // elements
  const headerBtns: MobileHeaderButton[] = [
    {
      icon: 'fas fa-info-circle',
      onClick: () => setShowInfo(v => !v),
    }
  ]

  return (
    <div className="PhotoSwiper">
      <div className="photo_viewer_container">
        <InfinitePageSwiper
          {...props}
          renderSlide={renderSlide}
          btns={headerBtns}
          onSlideChange={onSlideChange}
        />
      </div>
      <PhotoInfoSection show={showInfo} hide={hideInfo} albumId={props.albumId} photoId={nowPhotoId} />
    </div>
  )
}

export function renderSlide(photo: PhotoPreview | null) {
  if (photo === null) {
    return <Spinner animation="border"></Spinner>;
  }

  if (photo.type === 'VIDEO') {
    const url = photo.thumbnail.replace('thumbnail', 'video').replace('.jpg', '.mp4');
    return <video controls><source src={url} type="video/mp4" /></video>
  }

  const url = photo.thumbnail.replace('thumbnail', 'original').replace('jpg', photo.ext);
  return <img src={`${url}?size=1024`} alt={photo.id.toString()} />;
}
