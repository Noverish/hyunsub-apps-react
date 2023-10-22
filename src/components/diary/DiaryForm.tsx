import { t } from 'i18next';
import { Button, Form } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Diary } from 'src/model/diary';
import { toDateString } from 'src/utils';

interface Props {
  diary?: Diary;
  onComplete: (diary: Diary) => void;
  initialDate?: string;
}

export default function DiaryForm({ diary, onComplete, initialDate }: Props) {
  const defaultValues: Diary = diary ?? {
    date: initialDate ?? toDateString(new Date()),
    summary: '',
    content: '',
    friends: [],
  };

  const { register, handleSubmit, watch } = useForm<Diary>({ defaultValues });

  const onSubmit: SubmitHandler<Diary> = (diary: Diary) => {
    onComplete(diary);
  };

  const content = watch('content');

  return (
    <Form className="DiaryForm d-grid gap-3" onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="diary_form_title">
        <Form.Label>{t('DiaryForm.date')}</Form.Label>
        <Form.Control size="lg" type="text" placeholder="yyyy-MM-dd" {...register('date')} />
      </Form.Group>
      <hr className="m-0" />
      <Form.Group controlId="diary_form_summary">
        <Form.Label>{t('DiaryForm.summary')}</Form.Label>
        <Form.Control type="text" placeholder="Summary" {...register('summary')} />
      </Form.Group>
      <Form.Group controlId="diary_form_content">
        <Form.Label>{t('DiaryForm.content')}</Form.Label>
        <Form.Control as="textarea" rows={10} {...register('content')} />
        <div className="text-end">{t('letters', [content.length])}</div>
      </Form.Group>
      <Button variant="primary" type="submit">
        {t('complete')}
      </Button>
    </Form>
  );
}
