import { t } from 'i18next';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import PhotoListHooks from '../PhotoListHooks';

export interface PhotoSearchFormState {
  start?: string;
  end?: string;
  orphan?: boolean;
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
          <Form.Control type="date" {...register('start')} />
          <InputGroup.Text>~</InputGroup.Text>
          <Form.Control type="date" {...register('end')} />
        </InputGroup>
      </Form.Group>
      <Form.Group>
        <Form.Check label={t('PhotoSearchForm.orphan')} {...register('orphan')} />
      </Form.Group>
      <Button variant="primary" type="submit">
        {t('search')}
      </Button>
    </Form>
  );
}

function useDefaultValues(): PhotoSearchFormState {
  return PhotoListHooks.usePageParams();
}
