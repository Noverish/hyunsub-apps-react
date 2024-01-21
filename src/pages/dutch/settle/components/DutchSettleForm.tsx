import { t } from 'i18next';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import DutchSettleHooks from '../DutchSettleHooks';
import DutchTripCurrencyList from './DutchTripCurrencyList';
import DutchMemberSelect from 'src/components/dutch/form/DutchMemberSelect';
import { useControlProps } from 'src/utils';

interface FormState {
  memberId?: string;
}

export default function DutchSettleForm() {
  const { control, handleSubmit, formState } = useForm<FormState>();
  const { errors } = formState;

  const settle = DutchSettleHooks.useSettle();

  const memberRegister = useControlProps({
    name: 'memberId',
    control,
    rules: { required: t('common.form.feedback.required') },
  });

  const onSubmit = (state: FormState) => {
    const memberId = state.memberId;
    if (memberId) {
      settle(memberId);
    }
  };

  return (
    <Form className="d-grid gap-3" onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Label>{t('Dutch.settle-currency-rate')}</Form.Label>
        <DutchTripCurrencyList />
      </Form.Group>
      <Form.Group>
        <Form.Label>{t('DutchSettlePage.leader')}</Form.Label>
        <DutchMemberSelect {...memberRegister} isInvalid={!!errors.memberId} />
        <Form.Control.Feedback type="invalid">{errors.memberId?.message}</Form.Control.Feedback>
      </Form.Group>
      <Button type="submit">{t('Dutch.settle')}</Button>
    </Form>
  );
}
