import { ListGroup, Modal } from 'react-bootstrap';

export interface ButtonListModalItem {
  title: string;
  active?: boolean;
  onClick: () => void;
}

interface Props {
  className?: string;
  show: boolean;
  onHide: () => void;
  items: ButtonListModalItem[];
}

export default function ButtonListModal({ className, show, onHide, items }: Props) {
  const elements = items.map(v => (
    <ListGroup.Item
      as='button'
      key={v.title}
      active={v.active}
      onClick={() => {
        onHide();
        v.onClick();
      }}
    >
      {v.title}
    </ListGroup.Item>
  ))

  return (
    <Modal className={className} show={show} centered onHide={onHide}>
      <Modal.Body className="p-0">
        <ListGroup variant="flush">
          {elements}
        </ListGroup>
      </Modal.Body>
    </Modal>
  )
}
