import { Dispatch } from "@reduxjs/toolkit";
import { Button, Form, Modal } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { NavigateFunction, useNavigate } from "react-router-dom";
import logout from "src/api/auth/logout";
import { MyPageUserInfo } from "src/api/auth/my-page-user-info";
import rsaKey from "src/api/auth/auth/rsa-key";
import updateUserInfo from "src/api/auth/update-user-info";
import routes from "src/pages/auth/AuthRoutes";
import { updateMyPageState } from 'src/pages/auth/my/MyPageState';
import { RootState, useDispatch, useSelector } from "src/redux";
import { encrypt } from "src/utils/rsa-key";
import { TFunction } from "i18next";

interface Props {
  userInfo: MyPageUserInfo;
}

interface FormState {
  username: string;
}

export default function ModifyUsernameModal({ userInfo }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showUsernameModal } = useSelector(s => s.auth.my);

  const onHide = () => dispatch(updateMyPageState({ showUsernameModal: false }));

  const { register, handleSubmit, formState: { errors } } = useForm<FormState>({ defaultValues: { username: userInfo.username } });

  const usernameRegister = register('username', {
    required: t('auth.errMsg.empty-id') as string,
    minLength: { value: 4, message: t('auth.errMsg.short-id') },
    maxLength: { value: 20, message: t('auth.errMsg.long-id') },
    pattern: { value: /^[A-Za-z0-9]+$/, message: t('auth.errMsg.wrong-pattern-id') },
  });

  const usernameErrMsg = errors.username?.message;

  const onSubmit: SubmitHandler<FormState> = (state: FormState) => {
    dispatch(modifyUsername(t, navigate, state.username))
  };

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
          <Button variant="primary" type="submit">{t('modify')}</Button>
        </Form>

      </Modal.Body>
    </Modal>
  )
}

function modifyUsername(t: TFunction, navigate: NavigateFunction, username: string) {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const { publicKey } = await rsaKey();

    const encrypted = encrypt(publicKey, username);

    const result = await updateUserInfo({ username: encrypted }, );

    alert(t(result.username ? 'auth.modify-username-modal.success' : 'auth.modify-username-modal.failure'));

    dispatch(updateMyPageState({ showUsernameModal: false }));

    await logout();

    navigate(routes.login);
  }
}
