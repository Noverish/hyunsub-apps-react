import { t } from 'i18next';
import { useContext } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';

import { ProfileContext } from '../ProfileContext';
import ProfileHooks from '../ProfileHooks';
import profileDetailApi from 'src/api/auth/profile-detail';

interface FormState {
  username: string;
}

export default function ModifyUsernameModal() {
  // hooks
  const [{ showUsernameModal }, setState] = useContext(ProfileContext);
  const moddfyUsername = ProfileHooks.useModifyUsername();
  const { username } = profileDetailApi.useApi({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormState>({ defaultValues: { username } });

  // functions
  const onHide = () => setState({ showUsernameModal: false });

  const onSubmit: SubmitHandler<FormState> = (state: FormState) => {
    moddfyUsername(state.username);
  };

  // elements
  const usernameRegister = register('username', {
    required: t('auth.errMsg.empty-id') as string,
    minLength: { value: 4, message: t('auth.errMsg.short-id') },
    maxLength: { value: 20, message: t('auth.errMsg.long-id') },
    pattern: { value: /^[A-Za-z0-9]+$/, message: t('auth.errMsg.wrong-pattern-id') },
  });

  const usernameErrMsg = errors.username?.message;

  return (
    <Modal show={showUsernameModal} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('auth.modify-username-modal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>{t('auth.id')}</Form.Label>
            <Form.Control type="text" isInvalid={!!usernameErrMsg} {...usernameRegister} />
            <Form.Control.Feedback type="invalid">{usernameErrMsg}</Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            {t('modify')}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
