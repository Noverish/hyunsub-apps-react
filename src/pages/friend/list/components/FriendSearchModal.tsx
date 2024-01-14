import { t } from 'i18next';
import { useContext } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import FriendRoutes from '../../FriendRoutes';
import { FriendListContext } from '../FriendListContext';
import FriendListHooks, { FriendListPageParams } from '../FriendListHooks';
import router from 'src/pages/router';

export default function FriendSearchModal() {
  const pageParams = FriendListHooks.usePageParams();
  const [state, setState] = useContext(FriendListContext);
  const show = state.showSearch;

  const { register, handleSubmit } = useForm<FriendListPageParams>({ defaultValues: pageParams });

  const onHide = () => setState({ showSearch: false });

  const onSubmit = (params: FriendListPageParams) => {
    onHide();
    router.navigate(FriendRoutes.list(params));
  };

  return (
    <Modal className="FriendSearchModal" show={show} onHide={onHide} centered>
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
