import cs from 'classnames';
import { t } from 'i18next';
import { Button } from 'react-bootstrap';

import albumPhotoDetailApi from 'src/api/photo/album-photo-detail';
import photoDetailApi from 'src/api/photo/photo-detail';
import { Photo } from 'src/model/photo';
import PhotoRoutes from 'src/pages/photo/PhotoRoutes';
import router from 'src/pages/router';

import './PhotoInfoSection.scss';

interface Props {
  show: boolean;
  hide: () => void;
  albumId?: string;
  photoId?: string;
}

export default function PhotoInfoSection({ show, hide, albumId, photoId }: Props) {
  const table = !photoId ? (
    <PhotoInfoSectionTable />
  ) : albumId ? (
    <PhotoInfoSectionTableForAlbum albumId={albumId} photoId={photoId} />
  ) : (
    <PhotoInfoSectionTableForPhoto photoId={photoId} />
  );

  return (
    <div className={cs('PhotoInfoSection', { show })}>
      <div className="close_btn flex_center" onClick={hide}>
        <i className="fas fa-times" />
      </div>
      {table}
    </div>
  );
}

function PhotoInfoSectionTableForPhoto({ photoId }: { photoId: string }) {
  const photo = photoDetailApi.useApiResult({ photoId }).data;

  return <PhotoInfoSectionTable photo={photo} />;
}

function PhotoInfoSectionTableForAlbum({ albumId, photoId }: { albumId: string; photoId: string }) {
  const photo = albumPhotoDetailApi.useApiResult({ albumId, photoId }).data;

  return <PhotoInfoSectionTable photo={photo} />;
}

function PhotoInfoSectionTable({ photo }: { photo?: Photo }) {
  const onOriginalClick = () => {
    if (photo) {
      router.navigate(PhotoRoutes.photoOriginal({ photoId: photo.id }));
    }
  };

  return (
    <div className="PhotoInfoSectionTable">
      <div>{t('PhotoInfoSection.file-name')}</div>
      <div>{photo?.fileName}</div>
      <div>{t('PhotoInfoSection.image-size')}</div>
      <div>{photo?.imageSize}</div>
      <div>{t('PhotoInfoSection.file-size')}</div>
      <div>{photo?.fileSize}</div>
      <div>{t('PhotoInfoSection.date')}</div>
      <div>{photo?.date}</div>
      <div>{t('PhotoInfoSection.reg-dt')}</div>
      <div>{photo?.regDt}</div>
      <div>{t('PhotoInfoSection.date-type')}</div>
      <div>{photo?.dateType}</div>
      {photo && (
        <Button size="sm" onClick={onOriginalClick}>
          {t('PhotoViewer.view-original')}
        </Button>
      )}
    </div>
  );
}
