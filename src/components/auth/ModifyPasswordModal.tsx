import { RefObject, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import rsaKey from "src/api/auth/rsa-key";
import updateUserInfo from "src/api/auth/update-user-info";
import { encrypt } from "src/utils/rsa-key";

interface Props {
  btnRef: RefObject<HTMLButtonElement>;
}

interface FormState {
  password1: string;
  password2: string;
}

export default function ModifyPasswordModal({ btnRef }: Props) {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  const btn = btnRef.current;
  if (btn) {
    btn.onclick = () => setShow(true);
  }

  const onHide = () => setShow(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormState>();
  const passwordRef = useRef<string>();
  passwordRef.current = watch('password1');

  const passwordRegister1 = register('password1', {
    required: t('auth.errMsg.empty-pw'),
    minLength: { value: 8, message: t('auth.errMsg.short-pw') },
    maxLength: { value: 20, message: t('auth.errMsg.long-pw') },
  });

  const passwordRegister2 = register('password2', {
    required: t('auth.errMsg.empty-pw'),
    validate: v => v === passwordRef.current || t('auth.errMsg.not-equal-pw'),
  });

  const password1ErrMsg = errors.password1?.message;
  const password2ErrMsg = errors.password2?.message;

  const onSubmit: SubmitHandler<FormState> = (state: FormState) => {
    modifyPassword(state.password1)
      .then((success) => alert(t(
        success ? 'auth.modify-password-modal.success' : 'auth.modify-password-modal.failure'
      )))
      .then(() => onHide());
  };

  return (
    <Modal show={show} onHide={onHide} centered>
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
          <Button variant="primary" type="submit">{t('modify')}</Button>
        </Form>

      </Modal.Body>
    </Modal>
  )
}

async function modifyPassword(password: string): Promise<boolean> {
  const { publicKey } = await rsaKey();

  const encrypted = encrypt(publicKey, password);

  const result = await updateUserInfo({ password: encrypted });
  return !!result.password
}
