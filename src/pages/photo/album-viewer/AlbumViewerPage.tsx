import { Spinner } from 'react-bootstrap';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import albumPhotosApi from 'src/api/photo/album-photos';
import PageSwiperWrapper from 'src/components/common/PageSwiperWrapper';
import { Photo } from 'src/model/photo';
import routes from 'src/pages/photo/PhotoRoutes';

import './AlbumViewerPage.scss';

function renderSlide(photo: Photo | null) {
  if (photo === null) {
    return <Spinner animation="border"></Spinner>;
  }

  if (/\.mp4$/i.test(photo.url)) {
    return <video controls><source src={photo.url} type="video/mp4" /></video>
  }

  return <img src={`${photo.url}?size=1024`} alt={photo.id.toString()} />;
}

export default function AlbumViewerPage() {
  const albumId = parseInt(useParams().albumId!!, 10);
  const photoId = parseInt(useSearchParams()[0].get('photoId')!!, 10);
  const navigate = useNavigate();

  const fetchSlides = (page?: number) =>
    (page !== undefined)
      ? albumPhotosApi.fetch({ albumId, page })
      : albumPhotosApi.fetch({ albumId, photoId });

  const onSlideChange = (photo: Photo) => {
    navigate(routes.albumViewer(albumId, photo.id), { replace: true });
  }

  return (
    <div id="AlbumViewerPage">
      <PageSwiperWrapper
        readyOffSlideSize={2}
        slidePredicate={v => v?.id === photoId}
        renderSlide={renderSlide}
        onSlideChange={onSlideChange}
        fetchSlides={fetchSlides}
      />
    </div>
  )
}
