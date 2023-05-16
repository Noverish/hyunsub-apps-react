import { Button, Form, InputGroup } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';

import { videoEntryRenameAction } from '../VideoEntryManageActions';
import { EntryRenameParams } from 'src/api/video/entry-manage/entry-rename';
import { useUrlParams } from 'src/hooks/url-params';
import { dispatch } from 'src/redux';

import './VideoEntryRenameForm.scss';

type FormState = EntryRenameParams;

export default function VideoEntryRenameForm() {
  const [entryId] = useUrlParams('entryId');

  const { register, handleSubmit } = useForm<FormState>();

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

      <Button type="submit">일괄 변경</Button>
    </Form>
  );
}
