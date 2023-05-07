import React, { useEffect, useState } from 'react';
import { Button, Form, FormControl, InputGroup, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

interface Props {
  show: boolean;
  onHide: () => void;
  page: number;
  total: number;
  onPageChange: (page: number) => void;
}

export default function PageSelectModal(props: Props) {
  const { show, onHide, page, total, onPageChange } = props;
  const [now, setNow] = useState<number>(page);
  const { t } = useTranslation();

  useEffect(() => {
    setNow(page);
  }, [page]);

  const onConfirm = () => {
    if (isNaN(now) || now < 0 || now >= total) {
      alert(t('PageSelectModal.msg.invalid-page'));
      return;
    }

    onPageChange(now);
    onHide();
  };

  const onRangeChnage = (e: React.FormEvent<HTMLInputElement>) => {
    const v = parseInt(e.currentTarget.value, 10);
    setNow(v);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(e.currentTarget.value, 10);
    if (v > total) {
      setNow(total - 1);
    } else {
      setNow(v - 1);
    }
  };

  return (
    <Modal show={show} onHide={onHide} onClick={(e: any) => e.stopPropagation()} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('PageSelectModal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <FormControl type="number" value={isNaN(now) ? '' : now + 1} className="text-end" onChange={onInputChange} />
          <InputGroup.Text>/</InputGroup.Text>
          <FormControl type="number" value={total} readOnly />
        </InputGroup>
        <Form.Range min={0} max={total - 1} value={isNaN(now) ? 0 : now} style={{ touchAction: 'none' }} onInput={onRangeChnage} onClick={(e) => e.stopPropagation()} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {t('PageSelectModal.close')}
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          {t('PageSelectModal.move')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
