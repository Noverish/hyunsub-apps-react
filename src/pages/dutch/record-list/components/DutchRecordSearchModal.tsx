import { t } from 'i18next';
import { useContext } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useController, useForm } from 'react-hook-form';

import DutchRoutes from '../../DutchRoutes';
import DutchRecordListHooks, { DutchRecordListPageParams } from '../DutchRecordListHooks';
import DutchCurrencyDropdown from 'src/components/dutch/form/DutchCurrencyDropdown';
import { DutchRecordListContext } from 'src/pages/dutch/record-list/DutchRecordListContext';
import router from 'src/pages/router';

export default function DutchRecordSearchModal() {
  const pageParams = DutchRecordListHooks.usePageParams();
  const [state, setState] = useContext(DutchRecordListContext);
  const show = state.showSearch;

  const { register, handleSubmit, control } = useForm<DutchRecordListPageParams>({ defaultValues: pageParams });
  const { field: currencyField } = useController({ name: 'currency', control });
  const currencyFieldProps = { value: currencyField.value, onChange: currencyField.onChange };

  const onHide = () => setState({ showSearch: false });

  const onSubmit = (params: DutchRecordListPageParams) => {
    onHide();
    router.navigate(DutchRoutes.recordList(params));
  };

  return (
    <Modal className="DutchRecordSearchModal" show={show} onHide={onHide} centered>
      <Modal.Body>
        <Form className="d-grid gap-3" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label>{t('query')}</Form.Label>
            <Form.Control {...register('query')} />
          </Form.Group>
          <Form.Group>
            <Form.Label>{t('DutchRecord.currency')}</Form.Label>
            <DutchCurrencyDropdown {...currencyFieldProps} />
          </Form.Group>
          <Button variant="primary" type="submit">
            {t('search')}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
