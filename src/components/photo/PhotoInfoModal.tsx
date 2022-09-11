import { Modal, Stack } from 'react-bootstrap';
import { Photo } from 'src/model/photo';

interface Props {
  photo: Photo;
  show: boolean;
  onHide: () => void;
}

export default function PhotoInfoModal(props: Props) {
  const { show, onHide, photo } = props;

  const name = decodeURIComponent(photo.url.split('/').reverse()[0]);

  return (
    <Modal show={show} onHide={onHide} onClick={(e: any) => e.stopPropagation()}>
      <Modal.Header closeButton>
        <Modal.Title>{name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack gap={2}>
          <div>
            <div className="fw-bold fs-5">Dimension</div>
            <div>{photo.width} x {photo.height}</div>
          </div>
          <div>
            <div className="fw-bold fs-5">Date</div>
            <div>{photo.date}</div>
          </div>
          <div>
            <div className="fw-bold fs-5">Size</div>
            <div>{photo.size}</div>
          </div>
        </Stack>
      </Modal.Body>
    </Modal>
  )
}
