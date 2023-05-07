import { t } from 'i18next';
import { useContext } from 'react';
import { Button, Col, ProgressBar, Row } from 'react-bootstrap';

import { usePhotoUpload } from '../PhotoUploadHooks';
import PhotoUploadImage from './PhotoUploadImage';
import { PhotoUploadContext } from 'src/pages/photo/upload/PhotoUploadContext';

import './PhotoFileList.scss';

interface Props {
  albumId?: string;
}

export default function PhotoFileList({ albumId }: Props) {
  const [state, setState] = useContext(PhotoUploadContext);
  const { items, uploading, progress } = state;

  const photoUpload = usePhotoUpload(albumId);

  const onCancel = () => {
    setState({ items: [], uploading: false });
  };

  const elements = items.map((v) => (
    <Col key={v.path}>
      <PhotoUploadImage item={v} />
    </Col>
  ));

  return (
    <div className="PhotoFileList">
      <div className="header">
        <div className="photo_num">{t('PhotoUploadPage.photo-num', [items.length])}</div>
        <div className="btn_grp">
          {uploading || <Button onClick={photoUpload}>{t('PhotoUploadPage.upload')}</Button>}
          <Button variant="secondary" onClick={onCancel}>
            {t('PhotoUploadPage.cancel')}
          </Button>
        </div>
      </div>
      <hr />
      {uploading && <ProgressBar now={progress} label={`${progress}%`} className="mb-3" />}
      <Row className="g-2 row-cols-3 row-cols-md-6">{elements}</Row>
    </div>
  );
}
