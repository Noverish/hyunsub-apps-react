import { t } from 'i18next';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import DiaryFriendMultiSelect from './DiaryFriendMultiSelect';
import { Diary } from 'src/model/diary';
import { FriendPreview } from 'src/model/friend';
import { toDateString } from 'src/utils/date';

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
    photoNum: 0,
    photos: [],
  };

  const { register, handleSubmit, watch, setValue, getValues } = useForm<Diary>({ defaultValues });

  const onFriendSelect = (friend: FriendPreview) => {
    const friends = getValues('friends');
    const newFriends = [...friends, friend];
    setValue('friends', newFriends);
  };

  const onFriendRemove = (friend: FriendPreview) => {
    const friends = getValues('friends');
    const newFriends = friends.filter((v) => v.id !== friend.id);
    setValue('friends', newFriends);
  };

  const content = watch('content');

  return (
    <Form className="DiaryForm d-grid gap-3" onSubmit={handleSubmit(onComplete)}>
      <Form.Group controlId="diary_form_title">
        <Form.Label>{t('DiaryForm.date')}</Form.Label>
        <Form.Control size="lg" type="text" placeholder="yyyy-MM-dd" {...register('date')} />
      </Form.Group>
      <hr className="m-0" />
      <Form.Group controlId="diary_form_summary">
        <Form.Label>{t('DiaryForm.summary')}</Form.Label>
        <Form.Control type="text" placeholder="Summary" {...register('summary')} />
      </Form.Group>
      <Form.Group>
        <Form.Label>{t('DiaryForm.friends')}</Form.Label>
        <DiaryFriendMultiSelect value={watch('friends')} onSelect={onFriendSelect} onRemove={onFriendRemove} />
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
