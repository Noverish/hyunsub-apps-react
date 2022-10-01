import { Modal, Stack } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Photo } from 'src/model/photo';
import { urlToName } from 'src/utils';

interface Props {
  photo: Photo;
  show: boolean;
  onHide: () => void;
}

export default function PhotoInfoModal(props: Props) {
  const { show, onHide, photo } = props;
  const { t } = useTranslation();

  const name = urlToName(photo.url);

  return (
    <Modal show={show} onHide={onHide} onClick={(e: any) => e.stopPropagation()}>
      <Modal.Header closeButton>
        <Modal.Title>{name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack gap={2}>
          <div>
            <div className="fw-bold fs-5">{t('photo.term.photo-dimension')}</div>
            <div>{photo.width} x {photo.height}</div>
          </div>
          <div>
            <div className="fw-bold fs-5">{t('photo.term.photo-date')}</div>
            <div>{photo.date}</div>
          </div>
          <div>
            <div className="fw-bold fs-5">{t('photo.term.photo-size')}</div>
            <div>{photo.size}</div>
          </div>
        </Stack>
      </Modal.Body>
    </Modal>
  )
}
