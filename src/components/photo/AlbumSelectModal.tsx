import { t } from "i18next";
import { Modal, Row } from "react-bootstrap";
import albumListV2Api from 'src/api/photo/album-list-v2';
import AlbumPreviewView from 'src/components/photo/AlbumPreviewView';
import { AlbumPreview } from "src/model/photo";

interface Props {
  show: boolean;
  onHide: () => void;
  onClick: (preview: AlbumPreview) => void;
}

export default function AlbumSelectModal({ show, onHide, onClick }: Props) {
  const albums = albumListV2Api.useApi({});

  const elements = albums.map(v => (
    <AlbumPreviewView key={v.id} preview={v} onClick={onClick} />
  ))

  return (
    <Modal className="AlbumSelectModal" centered show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>{t('photo.album-select')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="g-2 row-cols-3">{elements}</Row>
      </Modal.Body>
    </Modal>
  )
}
