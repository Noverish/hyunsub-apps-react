import { t } from 'i18next';
import { useContext, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';

import ProfileHooks from '../ProfileHooks';
import { ProfileContext } from 'src/pages/auth/profile/ProfileContext';

interface FormState {
  password1: string;
  password2: string;
}

export default function ModifyPasswordModal() {
  const [{ showPasswordModal }, setState] = useContext(ProfileContext);
  const modifyPassword = ProfileHooks.useModifyPassword();

  const onHide = () => setState({ showPasswordModal: false });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormState>();
  const passwordRef = useRef<string>();
  passwordRef.current = watch('password1');

  const passwordRegister1 = register('password1', {
    required: t('auth.errMsg.empty-pw') as string,
    minLength: { value: 8, message: t('auth.errMsg.short-pw') },
    maxLength: { value: 20, message: t('auth.errMsg.long-pw') },
  });

  const passwordRegister2 = register('password2', {
    required: t('auth.errMsg.empty-pw') as string,
    validate: (v) => v === passwordRef.current || (t('auth.errMsg.not-equal-pw') as string),
  });

  const password1ErrMsg = errors.password1?.message;
  const password2ErrMsg = errors.password2?.message;

  const onSubmit: SubmitHandler<FormState> = (state: FormState) => {
    modifyPassword(state.password1);
  };

  return (
    <Modal show={showPasswordModal} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('auth.modify-password-modal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>{t('auth.pw')}</Form.Label>
            <Form.Control type="password" isInvalid={!!password1ErrMsg} {...passwordRegister1} />
            <Form.Control.Feedback type="invalid">{password1ErrMsg}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>{t('auth.pw-confirm')}</Form.Label>
            <Form.Control type="password" isInvalid={!!password2ErrMsg} {...passwordRegister2} />
            <Form.Control.Feedback type="invalid">{password2ErrMsg}</Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            {t('modify')}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
