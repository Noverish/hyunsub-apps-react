import { t } from 'i18next';
import { Form } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';

import { DutchBalanceUpdateBulkParams } from 'src/api/dutch/dutch-balance-update-bulk';

interface Props {
  index: number;
}

export default function DuthcBalanceFormItem({ index }: Props) {
  const { register, getValues, formState } = useFormContext<DutchBalanceUpdateBulkParams>();
  const { errors } = formState;

  const currency = getValues(`data.${index}.currency`);

  const amountRegister = register(`data.${index}.amount`, {
    valueAsNumber: true,
    min: { value: 0, message: t('common.form.feedback.no-minus') },
  });

  const amountError = errors.data?.[index]?.amount;

  return (
    <Form.Group className="DuthcBalanceFormItem">
      <Form.Label>{currency}</Form.Label>
      <Form.Control type="number" step="0.01" {...amountRegister} isInvalid={!!amountError} />
      <Form.Control.Feedback type="invalid">{amountError?.message}</Form.Control.Feedback>
    </Form.Group>
  );
}
