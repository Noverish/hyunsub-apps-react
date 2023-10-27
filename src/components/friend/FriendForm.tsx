import { t } from 'i18next';
import { Button, Form } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';

import FriendTagSelect from './FriendTagSelect';
import { Friend } from 'src/model/friend';

interface Props {
  friend?: Friend;
  onComplete: (friend: Friend) => void;
}

export default function FriendForm({ friend, onComplete }: Props) {
  const defaultValues: Friend = friend ?? {
    id: '',
    name: '',
    birthday: '',
    tags: [],
    description: '',
  };

  const { register, handleSubmit, control, watch } = useForm<Friend>({ defaultValues });

  const onSubmit: SubmitHandler<Friend> = (friend: Friend) => {
    onComplete(friend);
  };

  const descriptionHeight = (watch('description') ?? '').split('\n').length * 24 + 14;

  return (
    <Form className="FriendForm d-grid gap-3" onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="friend_form_name">
        <Form.Label>{t('FriendForm.name')}</Form.Label>
        <Form.Control type="text" {...register('name')} />
      </Form.Group>
      <Form.Group controlId="friend_form_birthday">
        <Form.Label>{t('FriendForm.birthday')}</Form.Label>
        <Form.Control type="text" {...register('birthday')} />
      </Form.Group>
      <Form.Group controlId="friend_form_tags">
        <Form.Label>{t('FriendForm.tags')}</Form.Label>
        <FriendTagSelect control={control} />
      </Form.Group>
      <Form.Group controlId="friend_form_description">
        <Form.Label>{t('FriendForm.description')}</Form.Label>
        <Form.Control
          as="textarea"
          type="text"
          {...register('description')}
          style={{ height: `${descriptionHeight}px` }}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        {t('complete')}
      </Button>
    </Form>
  );
}
