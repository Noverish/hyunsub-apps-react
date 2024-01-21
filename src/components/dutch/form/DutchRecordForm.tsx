import { t } from 'i18next';
import { Button, Form } from 'react-bootstrap';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import DutchCurrencySelect from './DutchCurrencySelect';
import { DutchRecordFormProvider } from './DutchRecordFormContext';
import DutchRecordFormHooks from './DutchRecordFormHooks';
import DutchRecordFormActualList from 'src/components/dutch/form/DutchRecordFormActualList';
import DutchRecordFormShouldList from 'src/components/dutch/form/DutchRecordFormShouldList';
import { DutchCurrency, DutchRecordDetail, DutchRecordParams } from 'src/model/dutch';
import { useControlProps } from 'src/utils';

import './DutchRecordForm.scss';

interface Props {
  record?: DutchRecordDetail;
  onComplete: (data: DutchRecordParams) => void;
}

export interface DutchRecordFormState {
  sum: string;
  content: string;
  location: string;
  currency: DutchCurrency;
  date: string;
  actuals: DutchRecordShare[];
  shoulds: DutchRecordShare[];
}

export interface DutchRecordShare {
  memberId: string;
  amount: number;
}

function DutchRecordForm({ onComplete }: Props) {
  const methods = useFormContext<DutchRecordFormState>();
  const { register, control, handleSubmit, formState, getValues } = methods;
  const { errors } = formState;

  const onSubmit = (state: DutchRecordFormState) => {
    onComplete(DutchRecordFormHooks.convertToRecordParams(state));
  };

  const contentRegister = register('content', {
    required: t('common.form.feedback.required'),
  });

  const locationRegister = register('location', {
    required: t('common.form.feedback.required'),
  });

  const currencyRegister = useControlProps({
    name: 'currency',
    control,
    rules: { required: t('common.form.feedback.required') },
  });

  const dateRegister = register('date', {
    required: t('common.form.feedback.required'),
  });

  register('sum', {
    validate: () => {
      const actualSum = getValues('actuals').reduce((acc, v) => acc + v.amount, 0);
      const shouldSum = getValues('shoulds').reduce((acc, v) => acc + v.amount, 0);
      return actualSum !== shouldSum ? t('DutchRecordForm.feedback.invalid-sum') : undefined;
    },
  });

  return (
    <Form className="DutchRecordForm d-grid gap-3" onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="dutch_record_form_content">
        <Form.Label>{t('DutchRecord.content')}</Form.Label>
        <Form.Control type="text" {...contentRegister} isInvalid={!!errors.content} />
        <Form.Control.Feedback type="invalid">{errors.content?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="dutch_record_form_location">
        <Form.Label>{t('DutchRecord.location')}</Form.Label>
        <Form.Control type="text" {...locationRegister} isInvalid={!!errors.location} />
        <Form.Control.Feedback type="invalid">{errors.location?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="dutch_record_form_currency">
        <Form.Label>{t('DutchRecord.currency')}</Form.Label>
        <DutchCurrencySelect {...currencyRegister} isInvalid={!!errors.currency} />
        <Form.Control.Feedback type="invalid">{errors.currency?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="dutch_record_form_date">
        <Form.Label>{t('DutchRecord.date')}</Form.Label>
        <Form.Control type="text" {...dateRegister} isInvalid={!!errors.date} />
        <Form.Control.Feedback type="invalid">{errors.date?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>{t('Dutch.actual')}</Form.Label>
        <DutchRecordFormActualList />
      </Form.Group>
      <Form.Group>
        <Form.Label>{t('Dutch.should')}</Form.Label>
        <DutchRecordFormShouldList />
        {errors.sum && (
          <Form.Control.Feedback type="invalid" className="d-block">
            {errors.sum?.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <hr />
      <Button type="submit">{t('complete')}</Button>
    </Form>
  );
}

export default function DutchRecordFormIndex(props: Props) {
  const defaultValues = DutchRecordFormHooks.useDefaultValues(props.record);
  const methods = useForm<DutchRecordFormState>({ defaultValues });

  return (
    <DutchRecordFormProvider>
      <FormProvider {...methods}>
        <DutchRecordForm {...props} />
      </FormProvider>
    </DutchRecordFormProvider>
  );
}
