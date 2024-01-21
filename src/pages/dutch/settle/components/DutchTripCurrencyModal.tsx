import { t } from 'i18next';
import { useContext } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import { DutchSettleContext } from '../DutchSettleContext';
import DutchSettleHooks from '../DutchSettleHooks';

interface FormState {
  rate: number;
}

export default function DutchTripCurrencyModal() {
  const [{ showCurrencyModal: show, currencyInModal: currency }, setState] = useContext(DutchSettleContext);
  const setTripCurrency = DutchSettleHooks.useSetTripCurrency();

  const defaultValues: FormState = { rate: currency?.rate ?? 0 };
  const { register, handleSubmit, formState } = useForm<FormState>({ defaultValues });
  const { errors } = formState;

  const rateRegister = register('rate', {
    required: t('common.form.feedback.required'),
  });

  const onHide = () => {
    setState({ showCurrencyModal: false });
  };

  const onSubmit = (state: FormState) => {
    setTripCurrency(state.rate);
  };

  return (
    <Modal className="DutchTripCurrencyModal" show={show} onHide={onHide} centered>
      <Modal.Header>{currency?.currency}</Modal.Header>
      <Modal.Body>
        <Form className="d-grid gap-3" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label>{t('Dutch.currency-rate')}</Form.Label>
            <Form.Control type="number" step="any" {...rateRegister} isInvalid={!!errors.rate} />
            <Form.Control.Feedback type="invalid">{errors.rate?.message}</Form.Control.Feedback>
          </Form.Group>
          <Button type="submit">{t('complete')}</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
