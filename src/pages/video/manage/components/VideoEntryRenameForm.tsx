import { Button, Form, InputGroup } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';

import { videoEntryRenameAction } from '../VideoEntryManageActions';
import { VideoRenameBulkParams } from 'src/api/video/admin/video-rename-bulk';
import { dispatch } from 'src/redux';

import './VideoEntryRenameForm.scss';

type FormState = VideoRenameBulkParams;

interface Props {
  entryId: string;
  videoIds: string[];
}

export default function VideoEntryRenameForm({ entryId, videoIds }: Props) {
  const { register, handleSubmit } = useForm<FormState>({
    defaultValues: {
      videoIds: videoIds,
      from: '',
      to: '',
      isRegex: false,
    },
  });

  const onSubmit: SubmitHandler<FormState> = (state: FormState) => {
    dispatch(videoEntryRenameAction(entryId, state));
  };

  return (
    <Form className="VideoEntryRenameForm mb-3" onSubmit={handleSubmit(onSubmit)}>
      <span>이름 일괄 변경</span>

      <div>
        <InputGroup className="from">
          <Form.Control {...register('from')} />
          <InputGroup.Text>
            <i className="fas fa-arrow-right"></i>
          </InputGroup.Text>
          <Form.Control {...register('to')} />
        </InputGroup>
      </div>

      <Form.Check {...register('isRegex')} type="checkbox" label="isRegex" defaultChecked={false} />

      <Button type="submit">일괄 변경</Button>
    </Form>
  );
}
