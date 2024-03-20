import { t } from 'i18next';
import { Button } from 'react-bootstrap';

import { PhotoPreview } from 'src/model/photo';
import PhotoRoutes from 'src/pages/photo/PhotoRoutes';
import router from 'src/pages/router';
import { useBreakpointMobile } from 'src/utils/breakpoint';
import { toLocaleString } from 'src/utils/date';

import './PhotoInfoSection.scss';

interface Props {
  albumId?: string;
  preview: PhotoPreview;
}

export default function PhotoInfoSection({ albumId, preview }: Props) {
  const photoId = preview.id;
  const isMobile = useBreakpointMobile();

  const onOriginalClick = () => {
    router.navigate(PhotoRoutes.photoOriginal({ albumId, photoId }));
  };

  const onDetailClick = () => {
    router.navigate(PhotoRoutes.photoDetail({ photoId }));
  };

  return (
    <div className="PhotoInfoSection">
      <div>{t('PhotoInfoSection.file-name')}</div>
      <div>{preview.fileName}</div>
      <div>{t('PhotoInfoSection.image-size')}</div>
      <div>{preview.imageSize}</div>
      <div>{t('PhotoInfoSection.file-size')}</div>
      <div>{preview.fileSize}</div>
      <div>{t('PhotoInfoSection.date')}</div>
      <div>{toLocaleString(preview.date)}</div>
      <div>{t('PhotoInfoSection.date-type')}</div>
      <div>{preview.dateType}</div>
      <div className="btn_group">
        {isMobile && (
          <Button size="sm" onClick={onOriginalClick}>
            {t('PhotoInfoSection.go-to-original')}
          </Button>
        )}
        <Button size="sm" onClick={onDetailClick}>
          {t('PhotoInfoSection.go-to-detail')}
        </Button>
      </div>
    </div>
  );
}
