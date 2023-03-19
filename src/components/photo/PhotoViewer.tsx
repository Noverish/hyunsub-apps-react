import { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import PageSwiper from 'src/components/common/swiper/PageSwiper';
import { PhotoPreview } from 'src/model/photo';

interface Props {
  photos: PhotoPreview[];
  photoId?: string;
}

export default function PhotoViewer(props: Props) {
  const { photos, photoId } = props;

  const initialPage = photoId ? photos.findIndex(v => v.id === photoId) : 0;

  return (
    <PageSwiper
      pageState={useState(initialPage)}
      initialPage={initialPage}
      slides={photos}
      renderSlide={renderSlide}
    />
  )
}

function renderSlide(photo: PhotoPreview | null) {
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
