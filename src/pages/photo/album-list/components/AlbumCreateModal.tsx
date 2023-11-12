import { t } from 'i18next';
import { useContext } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';

import { AlbumCreateParams } from 'src/api/photo/album-create';
import { AlbumListContext } from 'src/pages/photo/album-list/AlbumListContext';
import { useAlbumCreate } from 'src/pages/photo/album-list/AlbumListHooks';

type FormState = AlbumCreateParams;

export default function AlbumCreateModal() {
  const [{ showAlbumCreateModal }, setState] = useContext(AlbumListContext);
  const albumCreate = useAlbumCreate();

  const { register, handleSubmit, reset } = useForm<FormState>();

  const onHide = () => {
    reset();
    setState({ showAlbumCreateModal: false });
  };

  const onSubmit: SubmitHandler<FormState> = (state: FormState) => {
    onHide();
    albumCreate(state);
  };

  return (
    <Modal className="AlbumCreateModal" show={showAlbumCreateModal} onHide={onHide} centered>
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
  );
}
