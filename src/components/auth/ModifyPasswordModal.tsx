import { Dispatch } from "@reduxjs/toolkit";
import { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { TFunction, useTranslation } from "react-i18next";
import { MyPageUserInfo } from "src/api/auth/my-page-user-info";
import rsaKey from "src/api/auth/rsa-key";
import updateUserInfo from "src/api/auth/update-user-info";
import { updateMyPageState } from "src/pages/auth/my/MyPageState";
import { RootState, useDispatch, useSelector } from "src/redux";
import { encrypt } from "src/utils/rsa-key";

interface Props {
  userInfo: MyPageUserInfo;
}

interface FormState {
  password1: string;
  password2: string;
}

export default function ModifyPasswordModal({ userInfo }: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { showPasswordModal } = useSelector(s => s.auth.my);

  const onHide = () => dispatch(updateMyPageState({ showPasswordModal: false }));

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
    dispatch(modifyPassword(t, state.password1));
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
          <Button variant="primary" type="submit">{t('modify')}</Button>
        </Form>

      </Modal.Body>
    </Modal>
  )
}

function modifyPassword(t: TFunction, password: string) {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const { publicKey } = await rsaKey();

    const encrypted = encrypt(publicKey, password);

    const result = await updateUserInfo({ password: encrypted });
    
    alert(t(result.password ? 'auth.modify-password-modal.success' : 'auth.modify-password-modal.failure'));

    dispatch(updateMyPageState({ showPasswordModal: false }))
  }
}
