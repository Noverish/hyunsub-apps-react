import { t } from 'i18next';
import { useContext } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import DiaryRoutes from '../../DiaryRoutes';
import { DiaryListContext } from '../DiaryListContext';
import DiaryListHooks, { DiaryListPageParams } from '../DiaryListHooks';
import router from 'src/pages/router';

export default function DiarySearchModal() {
  const pageParams = DiaryListHooks.usePageParams();
  const [state, setState] = useContext(DiaryListContext);
  const show = state.showSearch;

  const { register, handleSubmit } = useForm<DiaryListPageParams>({ defaultValues: pageParams });

  const onHide = () => setState({ showSearch: false });

  const onSubmit = (params: DiaryListPageParams) => {
    onHide();
    router.navigate(DiaryRoutes.list(params));
  };

  return (
    <Modal className="DiarySearchModal" show={show} onHide={onHide} centered>
      <Modal.Body>
        <Form className="d-grid gap-3" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label>{t('query')}</Form.Label>
            <Form.Control {...register('query')} />
          </Form.Group>
          <Button variant="primary" type="submit">
            {t('search')}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
