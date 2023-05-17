import { t } from 'i18next';
import { useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';

import { YoutubeDownloadContext } from './YoutubeDownloadContext';

import './YoutubeDownloadInput.scss';

interface FormState {
  url: string;
}

export default function YoutubeDownloadInput() {
  const setState = useContext(YoutubeDownloadContext)[1];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormState>();

  const onSubmit: SubmitHandler<FormState> = async (state: FormState) => {
    setState({ url: state.url, nonce: undefined });
  };

  const registration = register('url', {
    required: t('drive.YoutubeDownloadModal.msg.empty-url'),
  });
  const urlError = errors.url?.message;

  return (
    <Form className="YoutubeDownloadInput" onSubmit={handleSubmit(onSubmit)}>
      <Form.Label>URL</Form.Label>
      <Form.Group className="url_wrapper">
        <Form.Control
          {...registration}
          placeholder="ex) https://www.youtube.com/watch?v=aG6iaZMV46I"
          isInvalid={!!urlError}
        />
        <Form.Control.Feedback type="invalid">{urlError}</Form.Control.Feedback>
      </Form.Group>
      <Button type="submit">{t('search')}</Button>
    </Form>
  );
}
