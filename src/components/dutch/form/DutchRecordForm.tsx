import { t } from 'i18next';
import { Button, Form } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';

import DutchCurrencyDropdown from './DutchCurrencyDropdown';
import DutchRecordFormMemberList from './DutchRecordFormMemberList';
import { DutchRecordDetail, DutchRecordParams } from 'src/model/dutch';
import { toDateTimeString } from 'src/utils/date';

import './DutchRecordForm.scss';

interface Props {
  record?: DutchRecordDetail;
  onComplete: (data: DutchRecordParams) => void;
}

export default function DutchRecordForm({ record, onComplete }: Props) {
  const defaultValues = generateDefaultValues(record);
  const methods = useForm<DutchRecordParams>({ defaultValues });
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

function generateDefaultValues(record?: DutchRecordDetail): Partial<DutchRecordParams> {
  if (!record) {
    return {
      date: toDateTimeString(new Date()),
    };
  }

  return {
    content: record.record.content,
    location: record.record.location,
    currency: record.record.currency,
    date: record.record.date,
    members: record.members.map((v) => ({
      memberId: v.memberId,
      actual: v.actual,
      should: v.should,
    })),
  };
}
