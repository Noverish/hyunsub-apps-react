import { t } from 'i18next';
import { useContext } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import { AlbumDetailContext } from '../AlbumDetailContext';
import { AlbumMember } from 'src/model/photo';
import { AlbumDetailState } from 'src/pages/photo/album-detail/AlbumDetailContext';

interface Props {
  members: AlbumMember[];
}

interface FormState {
  userIds: string[];
}

export default function AlbumPhotoSearchModal(props: Props) {
  const { members } = props;

  const [state, setState] = useContext(AlbumDetailContext);
  const defaultValues = useDefaultValues(state);
  const { register, handleSubmit } = useForm<FormState>({ defaultValues });

  const show = state.showSearchModal;

  const onHide = () => setState({ showSearchModal: false });

  const onSubmit = (state: FormState) => {
    setState({
      showSearchModal: false,
      photoSearchParams: state,
    });
  };

  const memberChecks = members.map((v) => (
    <Form.Check
      id={`member_${v.userId}`}
      inline
      key={v.userId}
      type="checkbox"
      label={v.name}
      value={v.userId}
      {...register('userIds')}
    />
  ));

  return (
    <Modal className="AlbumPhotoSearchModal" show={show} onHide={onHide} centered>
      <Modal.Header closeButton>사진 검색</Modal.Header>
      <Modal.Body>
        <Form className="d-grid gap-3" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label>멤버 선택</Form.Label>
            <div>{memberChecks}</div>
          </Form.Group>
          <div>
            <Button type="submit">{t('search')}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

function useDefaultValues(state: AlbumDetailState): FormState {
  return {
    userIds: state.photoSearchParams.userIds ?? [],
  };
}
