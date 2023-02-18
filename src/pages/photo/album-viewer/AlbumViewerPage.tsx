import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { flatInfiniteData } from 'src/api/generate-api';
import albumDetailApi from 'src/api/photo/album-detail';
import InfinitePageSwiper from 'src/components/common/swiper/InfinitePageSwiper';
import PhotoInfoModal from 'src/components/photo/PhotoInfoModal';
import { Photo } from 'src/model/photo';
import { setDocumentTitle } from 'src/utils/services';
import PhotoRoutes from '../PhotoRoutes';
import { useAlbumViewerPageFetch } from './AlbumViewerContext';

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
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showInfoModal, setShowInfoModal] = useState(false);

  const albumId = parseInt(useParams().albumId!!, 10);
  const photoId = parseInt(useSearchParams()[0].get('photoId')!!, 10);

  const album = albumDetailApi.useApi({ albumId });

  useEffect(() => {
    setDocumentTitle(t('photo.page.album-viewer.title', [album.name]));
  }, [t, album.name]);

  const { data, fetchNextPage } = useAlbumViewerPageFetch(albumId, photoId);
  const photos = flatInfiniteData(data!!);
  const initialPage = photos.findIndex(v => v?.id === photoId);
  const initialPhoto = photos.filter(v => v?.id === photoId)[0]!!;
  const [slide, setSlide] = useState(initialPage);
  const [currentPhoto, setCurrentPhoto] = useState<Photo | null>(initialPhoto);

  useEffect(() => {
    const nowPhoto = photos[slide];
    if (nowPhoto && !currentPhoto) {
      setCurrentPhoto(nowPhoto);
      window.history.replaceState(null, '', `?photoId=${nowPhoto.id}`);
    }
  }, [photos, slide, currentPhoto]);

  const onSlideChange = (slide: number) => {
    const nowPhoto = photos[slide];
    if (nowPhoto) {
      setCurrentPhoto(nowPhoto);
      window.history.replaceState(null, '', `?photoId=${nowPhoto.id}`);
    } else {
      setCurrentPhoto(null);
    }
  }

  const fetchSlides = (page: number) => {
    fetchNextPage({ pageParam: page });
  }

  const headerRightIcons = currentPhoto && (
    <>
      <i
        className="fas fa-info-circle"
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          e.stopPropagation();
          setShowInfoModal(true)
        }}
      />
      <i
        className="fas fa-expand"
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          e.stopPropagation();
          navigate(PhotoRoutes.photoOriginal(currentPhoto.id))
        }}
      />
    </>
  )

  return (
    <div id="AlbumViewerPage">
      <InfinitePageSwiper
        pageState={[slide, setSlide]}
        data={data!!}
        readyOffSlideSize={2}
        fetchSlides={fetchSlides}
        initialPage={initialPage}
        renderSlide={renderSlide}
        onPageChange={onSlideChange}
        headerRightIcons={headerRightIcons || undefined}
      />
      {currentPhoto && <PhotoInfoModal
        show={showInfoModal}
        onHide={() => setShowInfoModal(false)}
        photo={currentPhoto}
      />}
    </div>
  )
}
