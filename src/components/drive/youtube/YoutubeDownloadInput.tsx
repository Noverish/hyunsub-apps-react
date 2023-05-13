import { t } from 'i18next';
import { Button, Form } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';

import './YoutubeDownloadInput.scss';

interface Props {
  onSubmit: (url: string) => void;
}

interface FormState {
  url: string;
}

export default function YoutubeDownloadInput(props: Props) {
  const { register, handleSubmit } = useForm<FormState>();

  const onSubmit: SubmitHandler<FormState> = (state: FormState) => {
    props.onSubmit(state.url);
  };

  return (
    <Form className="YoutubeDownloadInput" onSubmit={handleSubmit(onSubmit)}>
      <Form.Label>URL</Form.Label>
      <Form.Control {...register('url')} placeholder="ex) https://www.youtube.com/watch?v=aG6iaZMV46I" />
      <Button type="submit">{t('search')}</Button>
    </Form>
  );
}
