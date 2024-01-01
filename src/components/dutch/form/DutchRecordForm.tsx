import { t } from 'i18next';
import { useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';

import DutchCurrencyDropdown from './DutchCurrencyDropdown';
import DutchRecordFormMemberList from './DutchRecordFormMemberList';
import { DutchRecordCreateParams } from 'src/api/dutch/dutch-record-create';
import { DutchContext } from 'src/context/dutch/DutchContext';
import { toDateTimeString } from 'src/utils/date';

import './DutchRecordForm.scss';

interface Props {
  onComplete: (params: DutchRecordCreateParams) => void;
}

export default function DutchRecordForm({ onComplete }: Props) {
  const { tripId } = useContext(DutchContext);

  const defaultValues: Partial<DutchRecordCreateParams> = {
    tripId,
    date: toDateTimeString(new Date()),
  };

  const methods = useForm<DutchRecordCreateParams>({ defaultValues });
  const { register, control, handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <Form className="DutchRecordForm d-grid gap-3" onSubmit={handleSubmit(onComplete)}>
        <Form.Group controlId="dutch_record_form_content">
          <Form.Label>{t('DutchRecord.content')}</Form.Label>
          <Form.Control type="text" {...register('content', { required: true })} />
        </Form.Group>
        <Form.Group controlId="dutch_record_form_location">
          <Form.Label>{t('DutchRecord.location')}</Form.Label>
          <Form.Control type="text" {...register('location', { required: true })} />
        </Form.Group>
        <Form.Group controlId="dutch_record_form_currency">
          <Form.Label>{t('DutchRecord.currency')}</Form.Label>
          <DutchCurrencyDropdown control={control} />
        </Form.Group>
        <Form.Group controlId="dutch_record_form_date">
          <Form.Label>{t('DutchRecord.date')}</Form.Label>
          <Form.Control type="text" {...register('date')} />
        </Form.Group>
        <DutchRecordFormMemberList />
        <hr />
        <Button type="submit">{t('complete')}</Button>
      </Form>
    </FormProvider>
  );
}
