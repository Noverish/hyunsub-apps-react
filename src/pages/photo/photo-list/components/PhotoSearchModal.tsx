import { t } from 'i18next';
import { useContext } from 'react';
import { Modal } from 'react-bootstrap';

import { PhotoListContext } from '../PhotoListContext';
import PhotoSearchForm from './PhotoSearchForm';

interface Props {}

export default function PhotoSearchModal(props: Props) {
  const [{ showSearchModal }, setState] = useContext(PhotoListContext);

  const onHide = () => setState({ showSearchModal: false });

  return (
    <Modal className="PhotoSearchModal" show={showSearchModal} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('PhotoSearchModal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PhotoSearchForm />
      </Modal.Body>
    </Modal>
  );
}
