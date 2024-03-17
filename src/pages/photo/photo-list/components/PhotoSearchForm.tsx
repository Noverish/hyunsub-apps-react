import { t } from 'i18next';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import PhotoListHooks from '../PhotoListHooks';

export interface PhotoSearchFormState {
  startDate: string;
  endDate: string;
}

export default function PhotoSearchForm() {
  const defaultValues = useDefaultValues();
  const { register, handleSubmit } = useForm<PhotoSearchFormState>({ defaultValues });
  const search = PhotoListHooks.useSearch();

  return (
    <Form className="PhotoSearchForm d-grid gap-3" onSubmit={handleSubmit(search)}>
      <Form.Group>
        <Form.Label>{t('PhotoSearchForm.date-range')}</Form.Label>
        <InputGroup>
          <Form.Control type="date" {...register('startDate')} />
          <InputGroup.Text>~</InputGroup.Text>
          <Form.Control type="date" {...register('endDate')} />
        </InputGroup>
      </Form.Group>
      <Button variant="primary" type="submit">
        {t('search')}
      </Button>
    </Form>
  );
}

function useDefaultValues(): PhotoSearchFormState {
  const { start, end } = PhotoListHooks.usePageParams();

  return {
    startDate: start ?? '',
    endDate: end ?? '',
  };
}
