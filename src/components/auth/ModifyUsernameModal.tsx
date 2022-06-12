import { RefObject, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import rsaKey from "src/api/auth/rsa-key";
import updateUserInfo from "src/api/auth/update-user-info";
import { encrypt } from "src/utils/rsa-key";

interface Props {
  username: string;
  btnRef: RefObject<HTMLButtonElement>;
}

interface FormState {
  username: string;
}

export default function ModifyUsernameModal({ username, btnRef }: Props) {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  const btn = btnRef.current;
  if (btn) {
    btn.onclick = () => setShow(true);
  }

  const onHide = () => setShow(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormState>({ defaultValues: { username } });

  const usernameRegister = register('username', {
    required: t('auth.errMsg.empty-id'),
    minLength: { value: 4, message: t('auth.errMsg.short-id') },
    maxLength: { value: 20, message: t('auth.errMsg.long-id') },
    pattern: { value: /^[A-Za-z0-9]+$/, message: t('auth.errMsg.wrong-pattern-id') },
  });

  const onSubmit: SubmitHandler<FormState> = (state: FormState) => {
    modifyUsername(state.username)
      .then((success) => alert(t(
        success ? 'auth.modify-username-modal.success' : 'auth.modify-username-modal.failure'
      )))
      .then(() => onHide());
  };

  const usernameErrMsg = errors.username?.message;

  return (
    <Modal show={show} onHide={onHide} centered>
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
          <Button variant="primary" type="submit">{t('modify')}</Button>
        </Form>

      </Modal.Body>
    </Modal>
  )
}

async function modifyUsername(username: string): Promise<boolean> {
  const { publicKey } = await rsaKey();

  const encrypted = encrypt(publicKey, username);

  const result = await updateUserInfo({ username: encrypted });
  return !!result.username;
}
