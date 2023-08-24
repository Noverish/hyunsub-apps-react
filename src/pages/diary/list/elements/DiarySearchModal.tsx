import { t } from 'i18next';
import { useContext } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';

import { DiaryListContext } from '../DiaryListContext';
import DiaryListHooks from '../DiaryListHooks';

interface FormState {
  query: string;
}

export default function DiarySearchModal() {
  // hooks
  const [{ showSearchModal: show }, setState] = useContext(DiaryListContext);
  const { register, handleSubmit } = useForm<FormState>();
  const search = DiaryListHooks.useSearch();

  // functions
  const onSubmit: SubmitHandler<FormState> = (state: FormState) => {
    search(state.query);
  };

  const onHide = () => setState({ showSearchModal: false });

  return (
    <Modal className="DiarySearchModal" show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('search')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)} className="d-grid gap-3">
          <Form.Group controlId="diary_search_modal_input">
            <Form.Label>{t('query')}</Form.Label>
            <Form.Control {...register('query')} placeholder={t('msg.type-query') as string} />
          </Form.Group>
          <Button type="submit">{t('search')}</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
