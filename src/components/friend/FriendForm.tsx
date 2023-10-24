import { t } from 'i18next';
import { Button, Form } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';

import FriendTagSelect from './FriendTagSelect';
import { Friend } from 'src/model/friend';

interface Props {
  onComplete: (friend: Friend) => void;
}

export default function FriendForm(props: Props) {
  const defaultValues: Friend = {
    id: '',
    name: '',
    birthday: '',
    tags: [],
    description: '',
  };

  const { register, handleSubmit, control } = useForm<Friend>({ defaultValues });

  const onSubmit: SubmitHandler<Friend> = (friend: Friend) => {
    props.onComplete(friend);
  };

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
        <Form.Control type="text" {...register('description')} />
      </Form.Group>
      <Button variant="primary" type="submit">
        {t('complete')}
      </Button>
    </Form>
  );
}
