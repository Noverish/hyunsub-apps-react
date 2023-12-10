import { t } from 'i18next';
import { useContext } from 'react';
import { Modal } from 'react-bootstrap';

import { PhotoDetailContext } from '../PhotoDetailContext';
import PhotoDetailHooks from '../PhotoDetailHooks';
import PhotoDateForm from './PhotoDateForm';
import { Photo } from 'src/model/photo';

interface Props {
  photo: Photo;
}

export default function PhotoDateModal({ photo }: Props) {
  const [{ showDateModal: show }] = useContext(PhotoDetailContext);
  const hide = PhotoDetailHooks.useShowDateModal(false);

  return (
    <Modal className="PhotoDateModal" centered show={show} onHide={hide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('PhotoDateModal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PhotoDateForm photo={photo} />
      </Modal.Body>
    </Modal>
  );
}
