import { useState } from 'react';
import albumPhotosApi from 'src/api/photo/album-photos';
import { MobileHeaderButton } from 'src/components/common/header/MobileHeader';
import PhotoInfoSection from 'src/components/photo/PhotoInfoSection';
import PhotoViewer from 'src/components/photo/PhotoSwiper';
import { useOptionalUrlParams, useUrlParams } from 'src/hooks/url-params';
import { PageData } from 'src/model/api';
import { PhotoPreview } from 'src/model/photo';

import './AlbumViewerPage.scss';

export default function AlbumViewerPage() {
  const [albumId] = useUrlParams('albumId');
  const [photoId] = useOptionalUrlParams('photoId');

  // hooks
  const infiniteQueryResult = albumPhotosApi.useInfiniteApi({ albumId, photoId });
  const { data } = infiniteQueryResult;
  const initialPage = getInitialPage(photoId, data?.pages[0]);
  const [showInfo, setShowInfo] = useState(false);
  const [nowPhotoId, setNowPhotoId] = useState(photoId);

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
    <div id="AlbumViewerPage">
      <div className="photo_viewer_container">
        <PhotoViewer
          infiniteQueryResult={infiniteQueryResult}
          initialSlide={initialPage}
          btns={headerBtns}
          onSlideChange={onSlideChange}
        />
      </div>
      <PhotoInfoSection show={showInfo} hide={hideInfo} photoId={nowPhotoId} />
    </div>
  )
}

function getInitialPage(photoId?: string, pageData?: PageData<PhotoPreview>): number | undefined {
  if (!pageData || !photoId) {
    return undefined;
  }

  const { data, page, pageSize } = pageData;

  const i = data.findIndex(v => v.id === photoId);
  if (i >= 0) {
    return i + page * pageSize;
  } else {
    return undefined;
  }
}
