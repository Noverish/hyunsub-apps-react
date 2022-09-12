import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import albumDetailApi from 'src/api/photo/album-detail';
import albumPhotosApi from 'src/api/photo/album-photos';
import PageSwiperWrapper, { makeSlides } from 'src/components/common/PageSwiperWrapper';
import PhotoInfoModal from 'src/components/photo/PhotoInfoModal';
import { Photo } from 'src/model/photo';
import routes from 'src/pages/photo/PhotoRoutes';
import { useDispatch, useSelector } from 'src/redux';
import { AlbumViewerActions } from './AlbumViewerState';

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
  const { t } = useTranslation();
  const albumId = parseInt(useParams().albumId!!, 10);
  const photoId = parseInt(useSearchParams()[0].get('photoId')!!, 10);

  const album = albumDetailApi.useApi({ albumId });

  useEffect(() => {
    document.title = t('photo.page.album-viewer.title', [album.name]);
  }, [t, album.name]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pageDataList } = useSelector(s => s.photo.albumViewer);
  const slides = makeSlides(pageDataList);
  const page = slides.findIndex(v => v?.id === photoId);
  const currentPhoto = slides[page];

  const [showInfoModal, setShowInfoModal] = useState(false);

  const fetchInitial = async () => {
    const initialPageData = await albumPhotosApi.fetch({ albumId, photoId });
    dispatch(AlbumViewerActions.putPageData(initialPageData));
    return initialPageData;
  };

  const fetchSlides = (page: number) => {
    albumPhotosApi.fetch({ albumId, page })
      .then((pageData) => {
        dispatch(AlbumViewerActions.putPageData(pageData))
      });
  }

  const onSlideChange = (page: number) => {
    const photo = slides[page];
    if (photo) {
      navigate(routes.albumViewer(albumId, photo.id), { replace: true });
    }
  }

  const headerRightIcons = (
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
          if (currentPhoto) {
            navigate(routes.photoOriginal(currentPhoto.id))
          }
        }}
      />
    </>
  )

  return (
    <div id="AlbumViewerPage">
      <PageSwiperWrapper
        pageDataList={pageDataList}
        readyOffSlideSize={2}
        fetchInitial={fetchInitial}
        fetchSlides={fetchSlides}

        page={page}
        slides={slides}
        onPageChange={onSlideChange}
        renderSlide={renderSlide}
        headerRightIcons={headerRightIcons}
      />
      {currentPhoto && <PhotoInfoModal
        show={showInfoModal}
        onHide={() => setShowInfoModal(false)}
        photo={currentPhoto}
      />}
    </div>
  )
}
