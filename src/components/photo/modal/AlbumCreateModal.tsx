import { t } from 'i18next';
import { Button, Form, Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AlbumCreateParams } from 'src/api/photo/album-create';

interface Props {
  show: boolean;
  callback: (params?: AlbumCreateParams) => void;
}

type FormState = AlbumCreateParams;

export default function AlbumCreateModal({ show, callback }: Props) {
  const { register, handleSubmit } = useForm<FormState>();

  const onSubmit: SubmitHandler<FormState> = (state: FormState) => {
    callback(state);
  };

  const onHide = () => callback();

  return (
    <Modal className="AlbumCreateModal" show={show} onHide={onHide} centered>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>{t('AlbumCreateModal.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>{t('AlbumCreateModal.name')}</Form.Label>
            <Form.Control {...register('name')} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">{t('create')}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
