import { Button, Form, Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { VideoEntryCreateParams } from 'src/api/video/admin/video-entry-create';
import VieoCategorySelect from 'src/components/video/select/VideoCategorySelect';
import VideoGroupSelect from 'src/components/video/select/VideoGroupSelect';
import { VideoCategory, VideoGroup } from 'src/model/video';
import { dispatch, useSelector } from 'src/redux';
import { filterEmptyString } from 'src/utils';
import { VideoAdminActions } from '../VideoAdminState';

interface Props {

}

type FormState = VideoEntryCreateParams;

export default function VideoEntryCreateModal(props: Props) {
  const show = useSelector(s => s.video.admin.showVideoEntryCreateModal);

  const onHide = () => {
    dispatch(VideoAdminActions.update({ showVideoEntryCreateModal: false }));
  }

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormState>();

  const onCategorySelect = (category: VideoCategory | null) => {
    setValue('category', category?.name ?? '');
  }

  const onGroupSelect = (group: VideoGroup | null) => {
    setValue('videoGroupId', group?.id ?? '');
  }

  const onSubmit: SubmitHandler<FormState> = (state: FormState) => {
    console.log(filterEmptyString(state));
  };

  register('category', { required: 'Category가 없습니다.' });

  return (
    <Modal className="VideoEntryCreateModal" show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Entry 생성</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Form onSubmit={handleSubmit(onSubmit)}>

          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control {...register('name', { required: 'Name이 없습니다.' })} isInvalid={!!errors.name?.message} />
            <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>thumbnail</Form.Label>
            <Form.Control {...register('thumbnail')} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <VieoCategorySelect onSelect={onCategorySelect} isInvalid={!!errors.category?.message} />
            <Form.Control.Feedback type="invalid">{errors.category?.message}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Group Id</Form.Label>
            <VideoGroupSelect onSelect={onGroupSelect} />
          </Form.Group>

          <Button variant="primary" type="submit">생성</Button>
        </Form>

      </Modal.Body>
    </Modal>
  )
}
